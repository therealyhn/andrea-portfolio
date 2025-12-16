export default {
    name: "about",
    title: "About",
    type: "document",
    fields: [
        { name: "leftTitle", title: "Left title", type: "string" },
        { name: "leftText", title: "Left text", type: "text", rows: 6 },

        { name: "centerImage", title: "Center image", type: "image", options: { hotspot: true } },

        { name: "rightTitle", title: "Right title (Work experience)", type: "string" },
        {
            name: "experiences",
            title: "Experiences",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "role", title: "Role", type: "string" },
                        { name: "company", title: "Company", type: "string" },
                        { name: "period", title: "Period", type: "string" },
                        { name: "description", title: "Description", type: "text", rows: 3 },
                    ],
                },
            ],
        },

        { name: "educationTitle", title: "Education title", type: "string", initialValue: "Education" },
        {
            name: "education",
            title: "Education",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "school", title: "School", type: "string" },
                        { name: "program", title: "Program", type: "string" },
                        { name: "period", title: "Period", type: "string" },
                    ],
                },
            ],
        },
    ],
};
