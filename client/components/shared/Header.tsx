import { CustomPortableText } from '@/components/shared/CustomPortableText'

import Form from '../pages/waiting/_components/Form/Form'

export interface FormDataProps {
  buttonText: string
  successMessage: string
  placeholder: string
  errorMessage: string
}

interface HeaderProps {
  centered?: boolean
  introduction?: any[]
  title?: string
  waitingList?: boolean
  form?: FormDataProps
}

export async function Header(props: HeaderProps) {
  const { title, introduction, centered = false, waitingList = false, form } = props

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
          <Form data={form}/>
        </div>
      )}
    </div>
  )
}
