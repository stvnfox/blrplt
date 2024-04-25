import { defineField, defineType } from "sanity"

export const pages = defineType({
    name: 'pages',
    type: 'document',
    title: 'Pages',
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            readOnly: true,
            initialValue: "Home",
        }),
        defineField({
            name: "header",
            title: "Header",
            type: "header",
            validation: (Rule) => Rule.required(),
        })
    ]
})