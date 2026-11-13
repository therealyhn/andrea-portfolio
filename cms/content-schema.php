<?php

declare(strict_types=1);

/*
 * Šema sadržaja sajta andreamilenovic.com za Maestro CMS (ugovor 3.12 u maestro-cms, kartica MS.12a).
 *
 * Kopira se u `content-schema.php` instance (`MCMS_CONTENT_SCHEMA_FILE`); proverava je `provision`,
 * odnosno `php backend/bin/seed.php content`. Tipovi odgovaraju Sanity tipovima `hero`, `whyMe` i
 * `workSection`, a prenos sa Sanity-ja je u `cms/sanity-map.json`. Sajt iz CMS-a čita samo dve
 * figure i kategorije radova sa galerijom (slike i video); ostali tekst sajta je u `src/data/`.
 * Obavezna polja su kao u Sanity šemi sajta. Sajt ove podatke čita pri izradi
 * (`scripts/fetch-cms-content.mjs`), pa ključ tipa ili polja ne menjaj bez izmene `src/lib/cms.js`.
 */

return [
    [
        'key' => 'baner',
        'name' => 'Baner',
        'kind' => 'single',
        'titleField' => 'figura',
        'fields' => [
            [
                'key' => 'figura',
                'type' => 'media',
                'label' => 'Figura (izrezana)',
                'help' => 'Portret sa providnom pozadinom (PNG ili WebP), uspravan format, oko 1360 x 2960 piksela. Bez slike sajt prikazuje svoju figuru.',
                'kinds' => ['image'],
            ],
        ],
    ],

    [
        'key' => 'zasto-ja',
        'name' => 'Zašto ja',
        'kind' => 'single',
        'titleField' => 'figura',
        'fields' => [
            [
                'key' => 'figura',
                'type' => 'media',
                'label' => 'Figura (izrezana)',
                'help' => 'Slika sa providnom pozadinom (PNG ili WebP), oko 1560 x 1784 piksela. Bez slike sajt prikazuje svoju figuru.',
                'kinds' => ['image'],
            ],
        ],
    ],

    [
        'key' => 'radovi',
        'name' => 'Radovi',
        'kind' => 'single',
        'titleField' => 'kategorije',
        'fields' => [
            [
                'key' => 'kategorije',
                'type' => 'repeater',
                'label' => 'Kategorije',
                'help' => 'Svaka stavka je jedna kategorija na sajtu. Redosled ovde je redosled na sajtu.',
                'fields' => [
                    ['key' => 'naziv', 'type' => 'text', 'label' => 'Naziv kategorije', 'required' => true],
                    [
                        // Galerija (ugovor 3.12, Dopuna 22.10.2026): lista medija redom kojim ih sajt prikazuje.
                        // Opis svakog medija je u unosu (`alt: true`, Dopuna 12.11.2026, kartica SN.06); uvoz
                        // ga upisuje iz `cms/sanity-asset-meta.json`.
                        'key' => 'galerija',
                        'type' => 'media',
                        'label' => 'Mediji (slike i video)',
                        'help' => 'Slike i video klipovi ove kategorije. Redosled ovde je redosled na sajtu.',
                        'kinds' => ['image', 'video'],
                        'multiple' => true,
                        'alt' => true,
                    ],
                ],
            ],
        ],
    ],
];
