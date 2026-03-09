import { defineField, defineType } from "sanity";

export default defineType({
    name: "whyMe",
    title: "WHY ME",
    type: "document",
    fields: [
        defineField({
            name: "heading",
            title: "Naslov",
            type: "string",
            initialValue: "Why Me?",
        }),
        defineField({
            name: "descriptionContent",
            title: "Opis / Tekst - RICH TEXT",
            type: "array",
            description: "Isti format kao About sekcija",
            of: [
                defineField({
                    type: "block",
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "Heading 3", value: "h3" },
                        { title: "Quote", value: "blockquote" },
                    ],
                    lists: [{ title: "Bullet", value: "bullet" }],
                    marks: {
                        decorators: [
                            { title: "Strong", value: "strong" },
                            { title: "Emphasis", value: "em" },
                        ],
                        annotations: [
                            defineField({
                                name: "link",
                                title: "Link",
                                type: "object",
                                fields: [
                                    defineField({
                                        name: "href",
                                        title: "URL",
                                        type: "url",
                                        validation: (Rule) =>
                                            Rule.uri({
                                                scheme: ["http", "https", "mailto", "tel"],
                                            }),
                                    }),
                                ],
                            }),
                        ],
                    },
                }),
                defineField({
                    type: "image",
                    title: "Inline slika",
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: "alt",
                            title: "Alt tekst",
                            type: "string",
                        }),
                    ],
                }),
            ],
            validation: (Rule) =>
                Rule.min(1).warning("Preporuka: koristi rich text umesto legacy plain texta."),
        }),
        defineField({
            name: "skills",
            title: "Lista Veština (Skills)",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "buttonText",
            title: "Tekst dugmeta",
            type: "string",
            initialValue: "Work With Me",
        }),
        defineField({
            name: "backgroundImage",
            title: "Pozadinska slika",
            type: "image",
            options: { hotspot: true },
        }),
    ],
});
