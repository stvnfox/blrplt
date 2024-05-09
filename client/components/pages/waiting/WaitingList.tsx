import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import Link from 'next/link'

import { Page } from '@/components/pages/waiting/_components/Page'
import { studioUrl } from '@/sanity/lib/api'
import { loadWaitingList } from '@/sanity/loader/loadQuery'

const PagePreview = dynamic(
  () => import('@/components/pages/waiting/_components/Preview'),
)

export default async function WaitingList() {
  const initial = await loadWaitingList()

  if (draftMode().isEnabled) {
    return <PagePreview initial={initial} />
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a waiting list page yet,{' '}
        <Link href={`${studioUrl}/structure/waitingList`} className="underline">
          create one now
        </Link>
        !
      </div>
    )
  }

  return <Page data={initial.data} />
}
