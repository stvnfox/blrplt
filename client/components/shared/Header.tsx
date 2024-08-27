import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { IWaitingListForm } from '@/types/waitingList'

import { WaitingListForm } from '../pages/waiting/_components/Form'

interface HeaderProps {
  centered?: boolean
  introduction?: any[]
  title?: string
  waitingList?: boolean
  form?: IWaitingListForm
}

export async function Header(props: HeaderProps) {
  const { title, introduction, centered = false, waitingList = false, form } = props

  if (!introduction && !title) {
    return null
  }
  return (
    <div className={`${centered ? 'text-center mx-auto' : 'w-5/6 lg:w-1/5'}`}>
      {/* Title */}
      {title && (
        <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl mb-6">
          {title}
        </h1>
      )}
      {/* Introduction */}
      {introduction && (
        <div className="mt-4 font-sans text-gray-600 md:text-base md:w-[500px] mx-auto">
          <CustomPortableText value={introduction} />
        </div>
      )}
      {/* Waiting List */}
      {waitingList && form && (
        <div className="mt-12">
          <WaitingListForm data={form}/>
        </div>
      )}
    </div>
  )
}
