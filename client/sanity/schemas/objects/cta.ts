import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'cta',
  title: 'Call to action',
  type: 'object',
  options: {
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'label',
      description: 'This field is the text shown on the button.',
      title: 'Button text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      description: 'In this field you select the section you want to link to.',
      title: 'Link',
      type: 'sectionSelector',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ariaLabel',
      description: 'This field is where you can describe the link for screen readers.',
      title: 'Aria label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  initialValue: {
    label: 'Call to action',
    link: 'usps',
    ariaLabel: 'Click here to find out more about our unique selling points',
  },
})
