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
            name: "description",
            title: "Opis / Tekst",
            type: "text",
            rows: 4,
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