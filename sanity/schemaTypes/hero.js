export default {
    name: "hero",
    title: "BANER",
    type: "document",
    fields: [
        {
            name: "figure",
            title: "SLIKA (izrezana figura)",
            type: "image",
            description: "Portret sa providnom pozadinom (PNG ili WebP), uspravan format. Preporuka: oko 1360 x 2960 px.",
            options: { hotspot: false },
        },
        {
            name: "curvedText",
            title: "Curved Text",
            type: "string",
            description: "Zakrivljen Tekst",
            hidden: true,
        },
        {
            name: "image",
            title: "Baner slika",
            type: "image",
            description: "1920x1080, transparentna (.png)",
            options: { hotspot: false },
            hidden: true,
        },
    ],
    preview: {
        select: { media: "figure" },
        prepare({ media }) {
            return { title: "Baner - slika", media };
        },
    },
};
