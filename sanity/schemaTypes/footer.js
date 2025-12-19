import { defineField, defineType } from "sanity";

export default defineType({
    name: "footer",
    title: "FOOTER",
    type: "document",
    fields: [
        defineField({
            name: "copyrightName",
            title: "Copyright Ime/Naziv",
            type: "string",
            initialValue: "Andrea Portfolio"
        }),
        defineField({
            name: "logo",
            title: "Logo (Light verzija za tamnu pozadinu)",
            type: "image",
            options: { hotspot: true }
        }),
        defineField({
            name: "facebookUrl",
            title: "Facebook Link",
            type: "url",
        }),
        defineField({
            name: "tiktokUrl",
            title: "TikTok Link",
            type: "url",
        }),
        defineField({
            name: "instagramUrl",
            title: "Instagram Link",
            type: "url",
        }),
    ],
});
