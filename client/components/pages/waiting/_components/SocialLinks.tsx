import { Linkedin } from 'lucide-react'
import { FunctionComponent } from 'react'

import { IWaitingListSocial } from '@/types/waitingList'

type SocialLinksProps = {
  items: IWaitingListSocial[]
}

export const SocialLinks: FunctionComponent<SocialLinksProps> = ({ items }) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case 'LinkedIn':
        return <Linkedin color="white" width={18} height={18} />
      default:
        return null
    }
  }

  return (
    <div className="flex justify-center space-x-2">
      {items.map((item, index) => (
        <a
          key={index}
          href={item.socialUrl}
          aria-label={`Check out our ${item.socialPlatform} website`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full w-8 h-8 flex items-center justify-center bg-gray-700 fill-white hover:bg-orange-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 focus-visible:outline-none transition-colors"
        >
          {item.socialPlatform === 'X' ? (
            <svg
              viewBox="0 0 1200 1227"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path>
            </svg>
          ) : (
            getIcon(item.socialPlatform)
          )}
        </a>
      ))}
    </div>
  )
}
