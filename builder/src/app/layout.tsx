import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "blrplt builder",
    description: "the place where you can build a website quickly without any hassle",
    verification: {
        google: "L9CWIdtPdszeYs50_jyhGuzYEQg41prlEz6uAr7utJU"
    }
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
