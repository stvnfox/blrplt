'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'

import { waitingListQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { WaitingListPayload } from '@/types'

import Page from './Page'

type Props = {
  initial: QueryResponseInitial<WaitingListPayload | null>
}

export default function PagePreview(props: Props) {
  const { initial } = props
  const { data, encodeDataAttribute } = useQuery<WaitingListPayload | null>(
    waitingListQuery,
    {},
    { initial },
  )

  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Waiting list document to see the preview!
      </div>
    )
  }

  return <Page data={data} encodeDataAttribute={encodeDataAttribute} />
}
