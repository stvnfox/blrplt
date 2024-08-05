import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { redirect } from "next/navigation"

import "../../globals.css"

import { prisma } from "@/lib/db"
import { createStyleObject } from "@/lib/settings/defaultValues"
import PreviewContextProvider from "@/providers/PreviewContextProvider"

const inter = Inter({ subsets: ["latin"] })

let title: string

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode
    params: { slug: string | string[] }
}>) {
    const slug = params.slug[0]

    const sites = await prisma.site.findMany({
        where: {
            url: slug,
        },
    })

    if (sites.length === 0) {
        redirect("https://builder.blrplt.dev")
    }

    title = sites[0].name
    const siteStyles = createStyleObject(sites[0].settings)

    return (
        <html lang="en">
            <body className={inter.className}>
                <PreviewContextProvider userSites={sites}>{children}</PreviewContextProvider>
                <style>
                    {siteStyles}
                </style>
            </body>
        </html>
    )
}

export async function generateMetadata({
    params: { slug },
}: {
    params: { slug: string | string[] }
}): Promise<Metadata> {
    return {
        title: title,
    }
}
