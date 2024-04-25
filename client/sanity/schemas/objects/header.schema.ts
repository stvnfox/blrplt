import { defineField, defineType } from "sanity"

export const header = defineType({
    name: 'header',
    type: 'object',
    title: 'Header',
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "subtitle",
            title: "Subtitle",
            type: "string"
        }),
        defineField({
            name: "intro",
            title: "Introduction",
            type: "text",
        }),
        defineField({
            name: "cta",
            title: "Call to action",
            type: "object",
            fields: [
                defineField({
                    name: "label",
                    title: "Label",
                    type: "string",
                }),
                defineField({
                    name: "alt",
                    title: "Alt text",
                    type: "string",
                }),
                defineField({
                    name: "link",
                    title: "Link",
                    type: "url",
                }),
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: "alt",
                    title: "Alt text",
                    type: "string",
                }),
            ]
        }),
    ],
})