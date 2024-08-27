import { HandMetal, UserCircle } from 'lucide-react'
import Link from 'next/link'

import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem, SettingsPayload } from '@/types'

interface NavbarProps {
  data: SettingsPayload
}

export default function Navbar(props: NavbarProps) {
  const { data } = props
  const title = data?.openGraph?.ogTitle || 'blrplt'
  const menuItems = data?.menuItems || ([] as MenuItem[])
  const isWaitingList = data?.waitingList || false

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between bg-white/80 px-4 py-4 backdrop-blur md:px-16 md:py-5 lg:px-32 container">
      <div className="flex justify-between items-center w-full">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg hover:text-black md:text-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 focus-visible:outline-none rounded"
        >
          <HandMetal /> {title}
        </Link>
        <Link
          href="https://builder.blrplt.dev"
          className="flex items-center gap-2 text-lg hover:text-orange-600 transition-colors md:text-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 focus-visible:outline-none rounded"
          aria-label='Go to the "builder" website'
        >
          <UserCircle />
        </Link>
      </div>
      <nav className="flex items-center gap-x-5">
        {menuItems &&
          !isWaitingList &&
          menuItems.map((menuItem, key) => {
            const href = resolveHref(menuItem?.section)
            if (!href) {
              return null
            }
            return (
              <Link
                key={key}
                className="text-lg hover:text-black md:text-xl"
                href={href}
              >
                {menuItem.section}
              </Link>
            )
          })}
      </nav>
    </div>
  )
}
