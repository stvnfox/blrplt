'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'

import { homePageQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { HomePagePayload } from '@/types'

import Page from './Page'

type Props = {
  initial: QueryResponseInitial<HomePagePayload | null>
}

export default function PagePreview(props: Props) {
  const { initial } = props
  const { data, encodeDataAttribute } = useQuery<HomePagePayload | null>(
    homePageQuery,
    {},
    { initial },
  )

  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Home document to see the preview!
      </div>
    )
  }

  return <Page data={data} encodeDataAttribute={encodeDataAttribute} />
}
