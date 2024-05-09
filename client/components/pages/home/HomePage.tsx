import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import Link from 'next/link'

import { Page } from '@/components/pages/home/_components/Page'
import { studioUrl } from '@/sanity/lib/api'
import { loadHomePage } from '@/sanity/loader/loadQuery'

const PagePreview = dynamic(
  () => import('@/components/pages/home/_components/Preview'),
)

export default async function HomePage() {
  const initial = await loadHomePage()

  if (draftMode().isEnabled) {
    return <PagePreview initial={initial} />
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a homepage yet,{' '}
        <Link href={`${studioUrl}/desk/home`} className="underline">
          create one now
        </Link>
        !
      </div>
    )
  }

  return <Page data={initial.data} />
}
