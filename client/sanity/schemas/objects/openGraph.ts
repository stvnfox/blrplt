import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'openGraph',
  title: 'Open Graph values',
  type: 'object',
  options: {
    collapsible: true,
  },
  fields: [
    defineField({
        name: 'ogTitle',
        title: 'Open Graph Title',
        description: 'This is the title of the page.',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'ogDescription',
        title: 'Open Graph Description',
        description: 'This is the description of the page.',
        type: 'array',
        of: [
          // Paragraphs
          defineArrayMember({
            lists: [],
            marks: {
              annotations: [
                {
                  name: 'link',
                  type: 'object',
                  title: 'Link',
                  fields: [
                    {
                      name: 'href',
                      type: 'url',
                      title: 'Url',
                    },
                  ],
                },
              ],
              decorators: [
                {
                  title: 'Italic',
                  value: 'em',
                },
                {
                  title: 'Strong',
                  value: 'strong',
                },
              ],
            },
            styles: [],
            type: 'block',
          }),
        ],
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'ogImage',
        title: 'Open Graph Image',
        type: 'image',
        description: 'Displayed on social cards and search engine results.',
        options: {
          hotspot: true,
        },
      }),
  ],
  initialValue: {
    ogTitle: 'blrplt',
    ogDescription: 'blrplt - the best boilerplate for your next project',
  },
})
