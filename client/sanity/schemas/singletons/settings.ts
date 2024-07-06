import { CogIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'waitingList',
      title: 'Waiting list',
      description:
        'Choose whether you want to display the waiting list template or the homepage template on your website. Selecting this option will determine the initial page your visitors see when accessing your site.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'themePicker',
      title: 'Theme',
      type: 'string',
      description: 'Choose the theme for your site.',
      options: {
        list: ['dark', 'light'],
      },
      initialValue: 'dark',
    }),
    defineField({
      name: 'menuItems',
      title: 'Menu Item list',
      description: 'Links displayed in the navigation of your site.',
      type: 'array',
      of: [
        {
          title: 'Menu item',
          type: 'object',
          fields: [
            defineField({
              name: 'section',
              title: 'Section name',
              type: 'string',
              options: {
                list: [{ title: 'Unique selling points', value: 'Unique selling points' }, { title: 'Pricing', value: 'Pricing' }, { title: "FAQ", value: 'FAQ' }, { title: "Testimonials", value: 'Testimonials' }, { title: 'Contact', value: 'Contact' }],
                layout: 'dropdown',
              },
              description:
                'Choose the section you want to add to your navigation.',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'footer',
      description:
        'This is a block of text that will be displayed at the bottom of the page.',
      title: 'Footer Info',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
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
          },
        }),
      ],
    }),
    defineField({
      name: 'openGraph',
      type: 'openGraph',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'The icon displayed in the browser tab.',
      options: {
        hotspot: true,
        accept: 'image/x-icon',
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'General settings',
      }
    },
  },
})
