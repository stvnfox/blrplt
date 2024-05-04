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
      description:
        'This field is where you describe your call to action button.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'headerImage',
      description:
        "This field is where you can upload an image an set all it's values.",
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
  },
})
