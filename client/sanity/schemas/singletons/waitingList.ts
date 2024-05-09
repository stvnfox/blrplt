import { RocketIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'waitingList',
  title: 'Waiting list',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'This field is the title of the page.',
      type: 'string',
      initialValue:
        'Join the waiting list, and be the first to know when we launch!',
      validation: (rule) => rule.required(),
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
      name: 'form',
      type: 'waitingListForm',
    }),
    defineField({
      name: 'socials',
      title: 'Socials (optional)',
      description: 'Links to social accounts displayed below the form.',
      type: 'array',
      of: [
        {
          title: 'Social',
          type: 'object',
          fields: [
            defineField({
              name: 'socialPlatform',
              title: 'Social platform',
              type: 'string',
              options: {
                list: ['X', 'Facebook', 'Instagram', 'LinkedIn'],
                layout: 'dropdown',
              },
              initialValue: 'X',
              description:
                'Choose the social platform you want to link to. This will determine the icon that is displayed.',
            }),
            defineField({
              name: 'socialUrl',
              title: 'Url',
              type: 'url',
              description: 'The url to the social platform.',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Waiting list',
      }
    },
  },
})
