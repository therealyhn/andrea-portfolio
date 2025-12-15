export default {
    name: "hero",
    title: "Hero",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "curvedText",
            title: "Curved Text",
            type: "string",
            description: "Text that goes around the hero image (e.g. UGC PORTFOLIO)",
        },
        {
            name: "image",
            title: "Hero Image",
            type: "image",
            options: { hotspot: true },
        },
        {
            name: "ctaText",
            title: "CTA Text",
            type: "string",
        },
        {
            name: "ctaLink",
            title: "CTA Link",
            type: "string",
            description: 'Anchor like "#contact" or full URL',
        },
    ],
};
