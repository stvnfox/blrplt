import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, projectId } from '@/sanity/lib/api'

enum HrefType {
  USPS = 'Unique selling points',
  PRICING = 'Pricing',
  FAQ = 'FAQ',
  TESTIMONIALS = 'Testimonials',
  CONTACT = 'Contact',
}

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image | undefined) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined
  }

  return imageBuilder?.image(source).auto('format').fit('max')
}

export function urlForOpenGraphImage(image: Image | undefined) {
  return urlForImage(image)?.width(1200).height(627).fit('crop').url()
}

export function resolveHref(
  url?: string,
): string | undefined {
  switch (url) {
    case HrefType.USPS:
      return '#unique-selling-points'
    case HrefType.PRICING:
      return '#pricing'
    case HrefType.FAQ:
      return '#faq'
    case HrefType.TESTIMONIALS:
      return '#testimonials'
    case HrefType.CONTACT:
      return '#contact'
    default:
      console.warn('Invalid document type:', url)
      return undefined
  }
}
