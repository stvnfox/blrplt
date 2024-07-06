import type { Metadata } from "next"
import { redirect } from "next/navigation"

import "../globals.css"

import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/db"
import BuilderContextProvider from "@/providers/BuilderContextProvider"

import { NavigationComponent } from "@/components/builder/layout/NavigationComponent/NavigationComponent"

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
        <main className="flex min-h-screen w-full flex-col">
            <BuilderContextProvider
                userId={data.user.id}
                userSites={sites}
            >
                <NavigationComponent />
                {children}
            </BuilderContextProvider>
        </main>
    )
}
