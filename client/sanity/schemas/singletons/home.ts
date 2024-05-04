import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'header',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'header.title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Home',
        title: title || 'Home',
      }
    },
  },
})
