import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { redirect } from "next/navigation"

import "../globals.css"

import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/db"
import BuilderContextProvider from "@/providers/BuilderContextProvider"

import { ProfileNavigation } from "@/components/builder/layout/ProfileNavigation"
import { PagesComponent } from "@/components/builder/layout/PagesComponent"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "blrplt builder",
    description: "the place where you can build a website quickly without any hassle",
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()

    if (error) {
        redirect("/login")
    }

    const sites = await prisma.site.findMany({
        where: {
            userId: data.user?.id,
        },
    })

    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="mx-10 my-8">
                    <ProfileNavigation />
                    <BuilderContextProvider
                        userId={data.user.id}
                        userSites={sites}
                    >
                        {children}
                        {sites.length > 0 ? <PagesComponent /> : null}
                    </BuilderContextProvider>
                </main>
            </body>
        </html>
    )
}
