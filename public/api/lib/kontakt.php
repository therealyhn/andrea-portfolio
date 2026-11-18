<?php
declare(strict_types=1);

// Endpoint kontakt forme, isti bajt po bajt na svakom sajtu (maestro-cms docs/plans/kontakt-forma, ugovor §2.4).
// Sajt menja samo blok u api/contact.php. Config i stanje su u <base>, folderu iznad docroot-a.

use PHPMailer\PHPMailer\Exception as MailerException;
use PHPMailer\PHPMailer\PHPMailer;

const KONTAKT_MAX_BODY = 16384;
const KONTAKT_IP_LIMIT = 5;
const KONTAKT_IP_WINDOW = 3600;
const KONTAKT_DAY_LIMIT = 100;
const KONTAKT_DAY_SECONDS = 86400;
const KONTAKT_STATE_TTL = 86400;
const KONTAKT_LOG_MAX = 1048576;

/**
 * @param array{site: string, origins: list<string>, fields: array<string, array<string, mixed>>} $site
 */
function kontakt_handle(array $site, string $base): never
{
    ini_set('display_errors', '0');
    ini_set('log_errors', '1');
    header_remove('X-Powered-By');

    $stateDir = $base . '/kontakt-stanje';
    $stateReady = is_dir($stateDir) || @mkdir($stateDir, 0700, true) || is_dir($stateDir);
    if ($stateReady) {
        ini_set('error_log', $stateDir . '/greske.log');
    }

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $originAllowed = is_string($origin) && in_array($origin, $site['origins'], true);
    $headers = [
        'Content-Type: application/json; charset=utf-8',
        'X-Content-Type-Options: nosniff',
        'Cache-Control: no-store',
        'Vary: Origin',
        "Content-Security-Policy: default-src 'none'; frame-ancestors 'none'",
    ];
    if ($originAllowed) {
        $headers[] = 'Access-Control-Allow-Origin: ' . $origin;
        $headers[] = 'Access-Control-Allow-Methods: POST, OPTIONS';
        $headers[] = 'Access-Control-Allow-Headers: Content-Type';
        $headers[] = 'Access-Control-Max-Age: 600';
    }

    set_exception_handler(static function (Throwable $error) use ($stateDir, $site, $headers): void {
        kontakt_log($stateDir, $site['site'], sprintf(
            'izuzetak %s u %s:%d: %s',
            $error::class,
            basename($error->getFile()),
            $error->getLine(),
            $error->getMessage(),
        ));
        kontakt_respond(500, $headers, 'Greška na serveru.');
    });

    if ($stateReady) {
        kontakt_cleanup($stateDir, time());
    }

    $method = $_SERVER['REQUEST_METHOD'] ?? '';
    if ($method !== 'POST' && $method !== 'OPTIONS') {
        kontakt_respond(405, [...$headers, 'Allow: POST, OPTIONS'], 'Dozvoljen je samo POST.');
    }
    if (!$originAllowed) {
        kontakt_respond(403, $headers, 'Zahtev nije dozvoljen.');
    }
    if ($method === 'OPTIONS') {
        kontakt_respond(204, $headers);
    }

    $autoload = dirname(__DIR__) . '/vendor/autoload.php';
    if (!is_file($autoload)) {
        kontakt_log($stateDir, $site['site'], 'vendor/autoload.php ne postoji pored api/contact.php');
        kontakt_respond(500, $headers, 'Greška na serveru.');
    }
    if (!$stateReady) {
        kontakt_log($stateDir, $site['site'], 'folder kontakt-stanje ne može da se napravi u ' . $base);
        kontakt_respond(500, $headers, 'Greška na serveru.');
    }
    $config = kontakt_load_config($base . '/kontakt-config.php');
    if (is_string($config)) {
        kontakt_log($stateDir, $site['site'], $config);
        kontakt_respond(500, $headers, 'Greška na serveru.');
    }
    require_once $autoload;

    $input = kontakt_read_body($headers);

    $honeypot = $input['website'] ?? '';
    if (!is_string($honeypot) || $honeypot !== '') {
        kontakt_respond(200, $headers);
    }

    $values = kontakt_validate($site['fields'], $input);
    if (is_string($values)) {
        kontakt_respond(422, $headers, $values);
    }

    $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
    $ipHash = hash_hmac('sha256', kontakt_rate_subject($ip), $config['rate_secret']);
    $retryAfter = kontakt_rate_check($stateDir, $ipHash, time());
    if ($retryAfter > 0) {
        kontakt_respond(429, [...$headers, 'Retry-After: ' . $retryAfter], 'Previše poruka, pokušajte kasnije.');
    }

    $failure = kontakt_send($config, $site, $values);
    if ($failure !== null) {
        kontakt_log($stateDir, $site['site'], 'slanje nije uspelo: ' . $failure);
        kontakt_respond(502, $headers, 'Slanje nije uspelo.');
    }

    kontakt_respond(200, $headers);
}

/**
 * Šalje odgovor i završava zahtev. Bez $error telo je {"success":true}; 204 nema telo.
 *
 * @param list<string> $headers
 */
function kontakt_respond(int $status, array $headers, ?string $error = null): never
{
    http_response_code($status);
    foreach ($headers as $header) {
        header($header);
    }
    if ($status !== 204) {
        $body = $error === null
            ? ['success' => true]
            : ['success' => false, 'error' => $error, 'code' => $status];
        echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }
    exit;
}

/**
 * Vraća proveren config ili opis problema (za log, bez vrednosti iz config-a).
 *
 * @return array{smtp_host: string, smtp_port: int, smtp_encryption: string, smtp_user: string, smtp_pass: string, from_name: string, to_email: string, rate_secret: string}|string
 */
function kontakt_load_config(string $path): array|string
{
    if (!is_file($path)) {
        return 'config ne postoji: kontakt-config.php u folderu iznad docroot-a';
    }

    // Izlaz iz config-a (BOM, razmak pre <?php) bi poslao telo pre zaglavlja; tekst greške parsera može da
    // sadrži deo lozinke, pa u log ide samo vrsta greške i red.
    ob_start();
    try {
        $config = (static fn (string $file): mixed => require $file)($path);
    } catch (Throwable $error) {
        return sprintf('config nije ispravan PHP: %s u redu %d', $error::class, $error->getLine());
    } finally {
        ob_end_clean();
    }
    if (!is_array($config)) {
        return 'config ne vraća niz';
    }

    $types = [
        'smtp_host' => 'string',
        'smtp_port' => 'int',
        'smtp_encryption' => 'string',
        'smtp_user' => 'string',
        'smtp_pass' => 'string',
        'from_name' => 'string',
        'to_email' => 'string',
        'rate_secret' => 'string',
    ];
    foreach ($types as $key => $type) {
        if (!array_key_exists($key, $config) || get_debug_type($config[$key]) !== $type) {
            return "config: ključ $key nedostaje ili nije tipa $type";
        }
    }
    if ($config['smtp_host'] === '') {
        return 'config: ključ smtp_host je prazan';
    }
    if ($config['smtp_port'] < 1 || $config['smtp_port'] > 65535) {
        return 'config: ključ smtp_port nije port od 1 do 65535';
    }
    foreach (['smtp_user', 'to_email'] as $key) {
        if (filter_var($config[$key], FILTER_VALIDATE_EMAIL) === false) {
            return "config: ključ $key nije email adresa";
        }
    }
    if (!in_array($config['smtp_encryption'], ['ssl', 'tls', 'none'], true)) {
        return 'config: ključ smtp_encryption mora biti ssl, tls ili none';
    }
    if ($config['smtp_encryption'] === 'none' && $config['smtp_host'] !== '127.0.0.1') {
        return 'config: ključ smtp_encryption none važi samo uz smtp_host 127.0.0.1';
    }
    if (preg_match('/\A[0-9a-f]{64}\z/i', $config['rate_secret']) !== 1) {
        return 'config: ključ rate_secret mora imati tačno 64 heksa znaka';
    }
    if ($config['smtp_pass'] === '' && $config['smtp_encryption'] !== 'none') {
        return 'config: ključ smtp_pass je prazan';
    }

    return $config;
}

/**
 * Koraci 5-7 ugovora: Content-Type, veličina i JSON objekat. Na grešku odgovara sam.
 *
 * @param list<string> $headers
 * @return array<array-key, mixed>
 */
function kontakt_read_body(array $headers): array
{
    $type = (string) ($_SERVER['CONTENT_TYPE'] ?? '');
    if (preg_match('/\Aapplication\/json\s*(?:;\s*charset\s*=\s*"?[A-Za-z0-9._-]+"?\s*)?\z/i', $type) !== 1) {
        kontakt_respond(415, $headers, 'Telo mora biti JSON.');
    }

    $length = (string) ($_SERVER['CONTENT_LENGTH'] ?? '');
    if ($length !== '' && (int) $length > KONTAKT_MAX_BODY) {
        kontakt_respond(413, $headers, 'Poruka je prevelika.');
    }
    $raw = file_get_contents('php://input', false, null, 0, KONTAKT_MAX_BODY + 1);
    if ($raw === false) {
        kontakt_respond(400, $headers, 'Telo zahteva nije čitljivo.');
    }
    if (strlen($raw) > KONTAKT_MAX_BODY) {
        kontakt_respond(413, $headers, 'Poruka je prevelika.');
    }

    try {
        $data = json_decode($raw, false, 4, JSON_THROW_ON_ERROR);
    } catch (JsonException) {
        kontakt_respond(400, $headers, 'Neispravan JSON.');
    }
    if (!$data instanceof stdClass) {
        kontakt_respond(400, $headers, 'Telo mora biti JSON objekat.');
    }

    return get_object_vars($data);
}

/**
 * Vraća očišćene vrednosti svih polja sajta ('' za prazno neobavezno) ili poruku greške.
 *
 * @param array<string, array<string, mixed>> $fields
 * @param array<array-key, mixed> $input
 * @return array<string, string>|string
 */
function kontakt_validate(array $fields, array $input): array|string
{
    $values = [];
    foreach ($fields as $key => $field) {
        $raw = $input[$key] ?? '';
        if (!is_string($raw)) {
            return 'Neispravno polje: ' . $field['label'];
        }

        $value = $field['type'] === 'text' ? str_replace("\r\n", "\n", $raw) : $raw;
        $clean = match ($field['type']) {
            'line' => preg_match('/\p{Cc}/u', $value) === 0,
            'text' => preg_match('/[^\P{Cc}\n]/u', $value) === 0,
            'email', 'enum' => true,
        };
        if (!$clean) {
            return 'Neispravno polje: ' . $field['label'];
        }

        $value = trim($value);
        if ($value === '') {
            if (!empty($field['required'])) {
                return 'Obavezno polje: ' . $field['label'];
            }
            $values[$key] = '';
            continue;
        }

        $valid = match ($field['type']) {
            'email' => filter_var($value, FILTER_VALIDATE_EMAIL) !== false,
            'enum' => in_array($value, $field['values'], true),
            default => true,
        };
        if (!$valid || (isset($field['max']) && mb_strlen($value, 'UTF-8') > $field['max'])) {
            return 'Neispravno polje: ' . $field['label'];
        }
        $values[$key] = $value;
    }

    return $values;
}

/**
 * Šta ulazi u heš limita po IP-ju: IPv4 cela adresa, IPv6 prvih 64 bita (jedan priključak dobija ceo /64 i menja
 * adresu po volji). Adrese iz ::/64 (::ffff:a.b.c.d, ::1) nisu prefiks jednog priključka i ostaju cele.
 */
function kontakt_rate_subject(string $ip): string
{
    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6) === false) {
        return $ip;
    }
    $prefix = substr((string) inet_pton($ip), 0, 8);

    return $prefix === str_repeat("\0", 8) ? $ip : bin2hex($prefix) . '::/64';
}

/**
 * Limit O06: 5 po satu po IP-ju (klizni prozor) i 100 po UTC danu po sajtu.
 * Vraća 0 kad je zahtev prihvaćen i upisan, inače broj sekundi za Retry-After.
 * Zaključavanje je svuda redom dan pa IP, a fajl IP-ja nastaje samo dok dnevni limit ima mesta: novih fajlova
 * ima najviše KONTAKT_DAY_LIMIT na dan, ma koliko adresa pošiljalac menjao.
 */
function kontakt_rate_check(string $stateDir, string $ipHash, int $now): int
{
    $write = static function ($handle, string $content): void {
        ftruncate($handle, 0);
        rewind($handle);
        fwrite($handle, $content);
        fflush($handle);
    };

    $ipFile = $stateDir . '/ip-' . $ipHash . '.json';
    if (is_file($ipFile) && (int) filemtime($ipFile) < $now - KONTAKT_STATE_TTL) {
        @unlink($ipFile);
    }

    $dayHandle = fopen($stateDir . '/dan-' . gmdate('Ymd', $now) . '.txt', 'c+');
    if ($dayHandle === false || !flock($dayHandle, LOCK_EX)) {
        throw new RuntimeException('stanje: dnevni brojač nije dostupan');
    }

    try {
        $count = (int) trim((string) stream_get_contents($dayHandle));
        if ($count >= KONTAKT_DAY_LIMIT) {
            return KONTAKT_DAY_SECONDS - ($now % KONTAKT_DAY_SECONDS);
        }

        $ipHandle = fopen($ipFile, 'c+');
        if ($ipHandle === false || !flock($ipHandle, LOCK_EX)) {
            throw new RuntimeException('stanje: fajl limita po IP-ju nije dostupan');
        }
        try {
            $stored = json_decode((string) stream_get_contents($ipHandle), true);
            $times = array_values(array_filter(
                is_array($stored) ? $stored : [],
                static fn (mixed $time): bool => is_int($time) && $time > $now - KONTAKT_IP_WINDOW,
            ));
            if (count($times) >= KONTAKT_IP_LIMIT) {
                return max(1, min($times) + KONTAKT_IP_WINDOW - $now);
            }
            $times[] = $now;
            $write($ipHandle, json_encode($times, JSON_THROW_ON_ERROR));
        } finally {
            flock($ipHandle, LOCK_UN);
            fclose($ipHandle);
        }

        $write($dayHandle, (string) ($count + 1));

        return 0;
    } finally {
        flock($dayHandle, LOCK_UN);
        fclose($dayHandle);
    }
}

/**
 * Šalje poruku kroz SMTP sandučeta sajta. Vraća null ili tekst greške PHPMailer-a.
 *
 * @param array{smtp_host: string, smtp_port: int, smtp_encryption: string, smtp_user: string, smtp_pass: string, from_name: string, to_email: string, rate_secret: string} $config
 * @param array{site: string, origins: list<string>, fields: array<string, array<string, mixed>>} $site
 * @param array<string, string> $values
 */
function kontakt_send(array $config, array $site, array $values): ?string
{
    $lines = [];
    $texts = [];
    foreach ($site['fields'] as $key => $field) {
        $value = $values[$key] ?? '';
        if ($value === '') {
            continue;
        }
        if ($field['type'] === 'text') {
            $texts[] = $field['label'] . ":\n" . $value;
        } else {
            $lines[] = $field['label'] . ': ' . $value;
        }
    }
    $body = implode("\n", $lines) . "\n\n";
    if ($texts !== []) {
        $body .= implode("\n\n", $texts) . "\n\n";
    }
    $body .= 'Poslato kroz kontakt formu sajta ' . $site['site'] . '.';

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = $config['smtp_host'];
        $mail->Port = $config['smtp_port'];
        $mail->Timeout = 15;
        if ($config['smtp_encryption'] === 'none') {
            $mail->SMTPAuth = false;
            $mail->SMTPSecure = '';
            $mail->SMTPAutoTLS = false;
        } else {
            $mail->SMTPAuth = true;
            $mail->Username = $config['smtp_user'];
            $mail->Password = $config['smtp_pass'];
            $mail->SMTPSecure = $config['smtp_encryption'] === 'ssl'
                ? PHPMailer::ENCRYPTION_SMTPS
                : PHPMailer::ENCRYPTION_STARTTLS;
        }
        $mail->CharSet = 'UTF-8';
        $mail->XMailer = ' ';
        $mail->isHTML(false);
        $mail->setFrom($config['smtp_user'], $config['from_name']);
        $mail->addAddress($config['to_email']);
        $mail->addReplyTo($values['email'], $values['name']);
        $mail->Subject = 'Poruka sa sajta ' . $site['site'] . ' - ' . mb_substr($values['name'], 0, 60, 'UTF-8');
        $mail->Body = $body;
        $mail->send();

        return null;
    } catch (MailerException $error) {
        return $mail->ErrorInfo !== '' ? $mail->ErrorInfo : $error->getMessage();
    }
}

/**
 * Red u <base>/kontakt-stanje/greske.log. Adrese se menjaju sa [adresa]; podaci posetioca nikad ne ulaze u poruku.
 */
function kontakt_log(string $stateDir, string $site, string $message): void
{
    $message = preg_replace('/[^\s@<>()\[\]"\',;:]+@[^\s@<>()\[\]"\',;:]+/u', '[adresa]', $message) ?? '[poruka nije čitljiva]';
    $line = sprintf("[%s] kontakt %s: %s\n", gmdate('Y-m-d\TH:i:s\Z'), $site, str_replace(["\r", "\n"], ' ', $message));

    if (!is_dir($stateDir)) {
        error_log(rtrim($line));
        return;
    }
    $file = $stateDir . '/greske.log';
    clearstatcache(true, $file);
    if (is_file($file) && filesize($file) > KONTAKT_LOG_MAX) {
        @unlink($file . '.1');
        @rename($file, $file . '.1');
    }
    @file_put_contents($file, $line, FILE_APPEND | LOCK_EX);
}

/**
 * Pri svakom 50. zahtevu briše brojače starije od 24 h. Rok iz pravnog teksta na sajtu bez poruka drži cron na
 * nalogu hostinga (plan kontakt-forma, O13).
 */
function kontakt_cleanup(string $stateDir, int $now): void
{
    if (random_int(1, 50) !== 1) {
        return;
    }
    $files = [...(glob($stateDir . '/ip-*.json') ?: []), ...(glob($stateDir . '/dan-*.txt') ?: [])];
    foreach ($files as $file) {
        $modified = @filemtime($file);
        if ($modified !== false && $modified < $now - KONTAKT_STATE_TTL) {
            @unlink($file);
        }
    }
}
