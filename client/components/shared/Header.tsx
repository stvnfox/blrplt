import { CustomPortableText } from '@/components/shared/CustomPortableText'

interface HeaderProps {
  centered?: boolean
  introduction?: any[]
  title?: string
  waitingList?: boolean
}
export function Header(props: HeaderProps) {
  const { title, introduction, centered = false, waitingList = false } = props
  if (!introduction && !title) {
    return null
  }
  return (
    <div className={`${centered ? 'text-center' : 'w-5/6 lg:w-3/5'}`}>
      {/* Title */}
      {title && (
        <div className="text-3xl font-extrabold tracking-tight md:text-5xl">
          {title}
        </div>
      )}
      {/* Introduction */}
      {introduction && (
        <div className="mt-4 font-serif text-xl text-gray-600 md:text-2xl">
          <CustomPortableText value={introduction} />
        </div>
      )}
      {/* Waiting List */}
      {waitingList && (
        <div className="mt-5">
          <a
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-700 hover:bg-blue-600 transition-colors rounded-lg shadow-lg"
            href="/waiting-list"
          >
            Join the Waiting List
          </a>
        </div>
      )}
    </div>
  )
}
