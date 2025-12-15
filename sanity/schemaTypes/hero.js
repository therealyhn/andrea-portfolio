export default {
    name: "hero",
    title: "Baner",
    type: "document",
    fields: [
        {
            name: "curvedText",
            title: "Curved Text",
            type: "string",
            description: "Zakrivljen Tekst",
        },
        {
            name: "image",
            title: "Baner slika",
            type: "image",
            description: "1920x1080, transparentna (.png)",
            options: { hotspot: false },
        },
    ],
};
