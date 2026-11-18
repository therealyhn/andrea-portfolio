<?php
// Sajt andreamilenovic.com.
// Kopija ide u <base>/kontakt-config.php, folder IZNAD public_html, nikad u repo i nikad u docroot.
return [
    'smtp_host' => 'smtp.hostinger.com',
    'smtp_port' => 465,
    'smtp_encryption' => 'ssl', // 'ssl' za 465, 'tls' za 587; 'none' prihvata samo smtp_host 127.0.0.1 (lokalna proba)
    'smtp_user' => 'sanduce@domen-sajta',
    'smtp_pass' => '',
    'from_name' => 'domen-sajta',
    'to_email' => 'primalac@domen',
    'rate_secret' => '', // 64 heksa znaka: php -r "echo bin2hex(random_bytes(32)), PHP_EOL;"
];
