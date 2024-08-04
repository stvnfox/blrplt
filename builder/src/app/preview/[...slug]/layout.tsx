import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { redirect } from "next/navigation"

import "../../globals.css"

import { prisma } from "@/lib/db"
import PreviewContextProvider from "@/providers/PreviewContextProvider"

const inter = Inter({ subsets: ["latin"] })

let title

export default async function RootLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode,
    params: { slug: string | string[]}
}>) {
    const slug = params.slug[0]

    const sites = await prisma.site.findMany({
        where: {
            url: slug,
        }
    })

    if(sites.length === 0) {
        redirect("https://builder.blrplt.dev")
    }

    title = sites[0].name

    return (
        <html lang="en">
            <body className={inter.className}>
                <PreviewContextProvider 
                    userSites={sites}
                >
                    {children}
                </PreviewContextProvider>
            </body>
        </html>
    )
}

// TODO: Fix title
export const metadata: Metadata = {
    title: title,
    description: "build by blrplt builder - the place where you can build a website quickly without any hassle",
}