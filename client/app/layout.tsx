import './globals.css'

import { Metadata } from 'next'
import { IBM_Plex_Mono, Inter, PT_Serif } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'
import { QueryProvider } from '@/utils/providers/QueryProvider'

const serif = PT_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})
const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['500', '700', '800'],
})
const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})

export const metadata: Metadata = {
  title: 'blrplt builder',
  description: 'the place where you can build a landing page in 10 minutes',
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${mono.variable} ${sans.variable} ${serif.variable}`}
    >
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  )
}
