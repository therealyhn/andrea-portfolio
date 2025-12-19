import { defineField, defineType } from "sanity";

export default defineType({
    name: "contactPage",
    title: "Contact Section",
    type: "document",
    fields: [
        defineField({
            name: "intro",
            title: "Uvodni tekst",
            type: "text",
            rows: 3,
            initialValue: "Molim vas popunite formular u ovom delu stranice kako biste me kontaktirali ili pozovite između 9:00 i 20:00, od ponedeljka do petka."
        }),
        defineField({
            name: "addressValue",
            title: "Adresa",
            type: "string",
        }),
        defineField({
            name: "emailValue",
            title: "Email Adresa",
            type: "string",
        }),
        defineField({
            name: "phoneValue",
            title: "Broj Telefona",
            type: "string",
        }),
        defineField({
            name: "instagramHandle",
            title: "Instagram Ime (npr. @mojprofil)",
            type: "string",
        }),
        defineField({
            name: "instagramUrl",
            title: "Instagram Link",
            type: "url",
        }),
    ],
});