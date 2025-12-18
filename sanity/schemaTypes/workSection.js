import { defineType, defineField } from "sanity";

export default defineType({
    name: "workSection",
    title: "WORK SECTION",
    type: "document",
    description: "My Work / Portfolio sekcija",
    fields: [
        defineField({
            name: "heading",
            title: "NASLOV",
            type: "string",
            description: 'Npr. "MY WORK"',
            validation: (Rule) => Rule.required(),
        }),
        // defineField({
        //     name: "subheading",
        //     title: "PODNASLOV",
        //     type: "string",
        //     description: "Opcionalno (kratka linija iznad/ispod naslova)",
        // }),
        defineField({
            name: "items",
            title: "STAVKE",
            type: "array",
            description: "Kategorije",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({
                            name: "title",
                            title: "NAZIV",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: "image",
                            title: "SLIKA",
                            type: "image",
                            options: { hotspot: true },
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: "description",
                            title: "OPIS",
                            type: "text",
                            rows: 3,
                        }),
                        defineField({
                            name: "gallery",
                            title: "GALERIJA SLIKA",
                            type: "array",
                            of: [{ type: "image", options: { hotspot: true } }],
                        }),
                    ],
                    preview: {
                        select: { title: "title", media: "image" },
                        prepare({ title, media }) {
                            return { title: title || "Work item", media };
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
