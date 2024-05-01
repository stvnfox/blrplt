import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'object',
  options: {
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of the page.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      description: 'This field is the subtitle of the page.',
      title: 'Subtitle (optional)',
      type: 'string',
    }),
    defineField({
      name: 'introduction',
      description:
        'This field is for a short introduction of the page. It should be no longer than 155 characters.',
      title: 'Introduction (optional)',
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
      validation: (rule) => rule.max(155),
    }),
    defineField({
      name: 'cta',
      title: 'Call to action',
      type: 'cta',
      description: 'This field is where you describe your call to action button.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'headerImage',
      description: 'This field is where you can upload an image.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image position',
      type: 'string',
      description: 'This field is where you can choose the position of the image.',
      options: {
        list: ['Left', 'Right'],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isFullWidth',
      title: 'Full width',
      type: 'boolean',
      description: 'This field is where you can choose if the image needs to be full width or not.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Home',
        title,
      }
    },
  },
  initialValue: {
    title: 'Title of the product',
    subtitle: 'Subtitle of the product',
    introduction: [
      {
        _key: '1',
        _type: 'block',
        children: [
          {
            _key: '1',
            _type: 'span',
            marks: [],
            text: 'This is a short introduction of the product.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    cta: {
      label: 'Call to action',
      link: 'pricing',
      ariaLabel: 'Click here to find out more about our unique selling points',
    },
    image: {
      altText: 'This is an image.',
    },
    imagePosition: 'Right',
    isFullWidth: false,
  }
})
