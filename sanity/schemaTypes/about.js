import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'about',
    title: 'ABOUT',
    type: 'document',
    description: 'About sekcija - tekst levo, slika u ramu, iskustvo i školovanje desno',

    fields: [
        defineField({
            name: 'leftTitle',
            title: 'NASLOV (LEVO)',
            type: 'string',
            description: 'Gornji levi naslov npr. "O meni"',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'leftContent',
            title: 'SADRZAJ (LEVO) - RICH TEXT',
            type: 'array',
            description: 'About text',
            of: [
                defineField({
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'Heading 3', value: 'h3' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    lists: [{ title: 'Bullet', value: 'bullet' }],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                        ],
                        annotations: [
                            defineField({
                                name: 'link',
                                title: 'Link',
                                type: 'object',
                                fields: [
                                    defineField({
                                        name: 'href',
                                        title: 'URL',
                                        type: 'url',
                                        validation: (Rule) =>
                                            Rule.uri({
                                                scheme: ['http', 'https', 'mailto', 'tel'],
                                            }),
                                    }),
                                ],
                            }),
                        ],
                    },
                }),
                defineField({
                    type: 'image',
                    title: 'Inline slika',
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: 'alt',
                            title: 'Alt tekst',
                            type: 'string',
                        }),
                    ],
                }),
            ],
            validation: (Rule) => Rule.min(1).warning('Preporuka: koristi rich text umesto legacy plain texta.'),
        }),

        defineField({
            name: 'centerImage',
            title: 'CENTRALNA SLIKA',
            type: 'image',
            options: { hotspot: true },
            description: 'Slika ide unutar fiksnog rama (bilo koja rezolucija)',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'rightTitle',
            title: 'NASLOV - RADNO ISKUSTVO',
            type: 'string',
            description: 'Npr. "Radno iskustvo"',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'experiences',
            title: 'RADNO ISKUSTVO',
            type: 'array',
            description: 'Dodaj iskustva. Preporuceno do 5-6',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'role',
                            title: 'POZICIJA',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'company',
                            title: 'KOMPANIJA',
                            type: 'string',
                        }),
                        defineField({
                            name: 'period',
                            title: 'PERIOD',
                            type: 'string',
                            description: 'Npr. "2023 - 2025" ili "Jan 2024 - Trenutno"',
                        }),
                        // defineField({
                        //     name: 'description',
                        //     title: 'OPIS',
                        //     type: 'text',
                        //     rows: 3,
                        //     description: 'Kratak opis uloge / zaduženja',
                        // }),
                    ],
                    preview: {
                        select: {
                            title: 'role',
                            subtitle: 'company',
                        },
                        prepare({ title, subtitle }) {
                            return {
                                title: title || 'Iskustvo',
                                subtitle: subtitle || '',
                            }
                        },
                    },
                },
            ],
        }),

        defineField({
            name: 'educationTitle',
            title: 'NASLOV - ŠKOLOVANJE',
            type: 'string',
            description: 'Npr. "Školovanje"',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'education',
            title: 'ŠKOLOVANJE',
            type: 'array',
            description: 'Dodaj stavke školovanja',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'school',
                            title: 'ŠKOLA / FAKULTET',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'program',
                            title: 'SMER / PROGRAM',
                            type: 'string',
                        }),
                        defineField({
                            name: 'period',
                            title: 'PERIOD',
                            type: 'string',
                            description: 'Npr. "2015 - 2019"',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'school',
                            subtitle: 'program',
                        },
                        prepare({ title, subtitle }) {
                            return {
                                title: title || 'Školovanje',
                                subtitle: subtitle || '',
                            }
                        },
                    },
                },
            ],
        }),
    ],

    preview: {
        select: {
            title: 'leftTitle',
            media: 'centerImage',
        },
        prepare({ title, media }) {
            return {
                title: title || 'About',
                subtitle: 'Sekcija "About"',
                media,
            }
        },
    },
})
