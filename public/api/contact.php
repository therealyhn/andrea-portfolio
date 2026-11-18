<?php
declare(strict_types=1);

require __DIR__ . '/lib/kontakt.php';

kontakt_handle([
    'site' => 'andreamilenovic.com',
    'origins' => ['https://andreamilenovic.com', 'https://www.andreamilenovic.com'],
    'fields' => [
        'name' => ['label' => 'Ime', 'type' => 'line', 'required' => true, 'max' => 100],
        'email' => ['label' => 'Email', 'type' => 'email', 'required' => true, 'max' => 254],
        'phone' => ['label' => 'Telefon', 'type' => 'line', 'required' => true, 'max' => 40],
        'message' => ['label' => 'Poruka', 'type' => 'text', 'required' => true, 'max' => 5000],
    ],
], dirname(__DIR__, 2));
