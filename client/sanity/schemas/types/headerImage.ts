import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'headerImage',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'altText',
      description: 'This field is where you can describe the image for screen readers.',
      title: 'Alternative text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  initialValue: {
    altText: 'This is an image.',
  },
})
