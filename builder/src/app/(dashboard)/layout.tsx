import type { Metadata } from "next"

import "../globals.css"

import BuilderContextProvider from "@/providers/BuilderContextProvider"
import { fetchSiteData } from "@/actions/data"

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
    const { user, sites} = await fetchSiteData()

    return (
        <main className="flex min-h-screen w-full flex-col">
            <BuilderContextProvider
                userId={user.id}
                userEmail={user.email}
                userSites={sites}
            >
                <NavigationComponent />
                {children}
            </BuilderContextProvider>
        </main>
    )
}
