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
      title: 'Form',
      description: 'This field holds every value for the form.',
      type: 'object',
      fields: [
        defineField({
          name: 'placeholder',
          title: 'Placeholder',
          type: 'string',
          description: 'This field is for the placeholder in the input field.',
          initialValue: 'Enter your email address',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'buttonText',
          title: 'Button text',
          type: 'string',
          description: 'This field is the text of the button.',
          initialValue: 'Join now!',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'successMessage',
      title: 'Success message',
      type: 'string',
      description:
        "This field is for the success message that's being showed when the user successfully submitted there email.",
      initialValue: "Yeey! You're on the waiting list! 🚀",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error message',
      type: 'string',
      description:
        "This field is for the error message that's being showed when the submit failed.",
      initialValue: 'Meh.. Something went wrong! Please try again.',
      validation: (rule) => rule.required(),
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
