import { defineType, defineField } from "sanity";

export default defineType({
    name: "workSection",
    title: "WORK - KATEGORIJE",
    type: "document",
    description: "My Work / Portfolio sekcija",
    fields: [
        defineField({
            name: "heading",
            title: "NASLOV",
            type: "string",
            description: 'Npr. "MY WORK"',
            hidden: true,
        }),
        // defineField({
        //     name: "subheading",
        //     title: "PODNASLOV",
        //     type: "string",
        //     description: "Opcionalno (kratka linija iznad/ispod naslova)",
        // }),
        defineField({
            name: "items",
            title: "KATEGORIJE",
            type: "array",
            description: "Svaka stavka je jedna kategorija na sajtu. Redosled ovde = redosled na sajtu.",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({
                            name: "title",
                            title: "NAZIV KATEGORIJE",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: "image",
                            title: "SLIKA",
                            type: "image",
                            options: { hotspot: true },
                            hidden: true,
                        }),
                        defineField({
                            name: "description",
                            title: "OPIS",
                            type: "text",
                            rows: 3,
                            hidden: true,
                        }),
                        defineField({
                            name: "gallery",
                            title: "MEDIJI (SLIKE / VIDEO)",
                            type: "array",
                            of: [
                                { type: "image", options: { hotspot: true } },
                                {
                                    type: "file",
                                    options: { accept: "video/*" },
                                },
                            ],
                            description: "Slike i video klipovi u ovoj kategoriji. Redosled ovde = redosled na sajtu.",
                        }),
                    ],
                    preview: {
                        select: { title: "title", gallery: "gallery" },
                        prepare({ title, gallery }) {
                            return { title: title || "Kategorija", subtitle: `${(gallery || []).length} medija` };
                        },
                    },
                },
            ],
            // validation: (Rule) => Rule.max(4).warning("Preporuka je max 4 stavke (kao u mockupu)."),
        }),
    ],
    preview: {
        select: { title: "heading" },
        prepare({ title }) {
            return { title: title || "Work Section", subtitle: 'Sekcija "My Work"' };
        },
    },
});
