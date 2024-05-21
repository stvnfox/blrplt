import type { EncodeDataAttributeCallback } from '@sanity/react-loader'

import { Header } from '@/components/shared/Header'
import type { WaitingListPayload } from '@/types'
import { IWaitingListForm } from '@/types/waitingList'

export interface HomePageProps {
  data: WaitingListPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function Page({ data, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { introduction = [], title = '', form = {} as IWaitingListForm } = data ?? {}

  return (
    <div className="space-y-20">
      {/* Header */}
      {title && form && <Header centered title={title} introduction={introduction} waitingList form={form} />}
    </div>
  )
}

export default Page
