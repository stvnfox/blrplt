import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    title,
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    waitingList,
    themePicker,
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogTitle,
    ogDescription,
    ogImage,
    favicon,
  }
`
