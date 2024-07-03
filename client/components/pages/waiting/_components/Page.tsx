import type { EncodeDataAttributeCallback } from '@sanity/react-loader'

import { Header } from '@/components/shared/Header'
import type { WaitingListPayload } from '@/types'
import { IWaitingListForm, IWaitingListSocial } from '@/types/waitingList'

import { SocialLinks } from './SocialLinks'

export interface HomePageProps {
  data: WaitingListPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function Page({ data, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { introduction = [], title = '', form = {} as IWaitingListForm, socials = [] as IWaitingListSocial[] } = data ?? {}

  return (
    <div className="space-y-12">
      {/* Header */}
      {title && form && <Header centered title={title} introduction={introduction} waitingList form={form} />}
      {/* Socials */}
      {socials.length > 0 && <SocialLinks items={socials}/>}
      <hr className='w-11/12 md:w-[600px] mx-auto'/>
    </div>
  )
}

export default Page
