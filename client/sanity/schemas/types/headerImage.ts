import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'headerImage',
  title: 'Image',
  type: 'object',
  options: {
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'showImage',
      title: 'Show image',
      type: 'boolean',
      description:
        'This field is where you can choose if you want to show a header image or not.',
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'This field is where you can upload an image.',
      hidden: ({ parent }) => {
        if (parent && parent.showImage === false) {
          return true
        }
        return false
      },
      validation: (Rule) =>
        Rule.custom((fieldValue, context) => {
          // @ts-expect-error context from Sanity is not typed
          if (context.document?.header.image.showImage && !fieldValue) {
            return 'Image is required when "Show Image" is true'
          }
          return true
        }),
    }),
    defineField({
      name: 'altText',
      description:
        'This field is where you can describe the image for screen readers.',
      title: 'Alternative text',
      type: 'string',
      hidden: ({ parent }) => {
        if (parent && parent.showImage === false) {
          return true
        }
        return false
      },
      validation: (Rule) =>
        Rule.custom((fieldValue, context) => {
          // @ts-expect-error context from Sanity is not typed
          if (context.document?.header.image.showImage && !fieldValue) {
            return 'Alt text is required when "Show Image" is true'
          }
          return true
        }),
    }),
    defineField({
      name: 'isFullWidth',
      title: 'Full width',
      type: 'boolean',
      description:
        'This field is where you can choose if the image needs to be full width or not.',
      hidden: ({ parent }) => {
        if (parent && parent.showImage === false) {
          return true
        }
        return false
      },
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image position',
      type: 'string',
      description:
        'This field is where you can choose the position of the image.',
      options: {
        list: ['Left', 'Right'],
        layout: 'radio',
      },
      hidden: ({ parent }) => {
        if (parent && parent.showImage === false) {
          return true
        }
        return false
      },
      validation: (Rule) =>
        Rule.custom((fieldValue, context) => {
          // @ts-expect-error context from Sanity is not typed
          if (context.document.header.image.showImage && !fieldValue) {
            return 'Position is required when "Show Image" is true'
          }
          return true
        }),
    }),
  ],
  initialValue: {
    altText: 'This is an image.',
    imagePosition: 'Right',
    isFullWidth: false,
  },
})
