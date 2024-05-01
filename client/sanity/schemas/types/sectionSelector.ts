import { defineType } from 'sanity'

// We need will extend and import these in the custom input component later
export const SECTIONS = [
  { title: 'Unique selling points', value: 'usps' },
  { title: 'Pricing', value: 'pricing' },
  { title: 'Frequently asked questions', value: 'faq' },
  { title: 'Testimonials', value: 'testimonials' },
]

export default defineType({
  name: 'sectionSelector',
  title: 'Section selector',
  type: 'string',
  options: {
    list: SECTIONS.map(({ title, value }) => ({ title, value })),
    layout: 'radio',
  },
})
