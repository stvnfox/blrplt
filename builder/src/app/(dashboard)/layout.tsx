import type { Metadata } from "next"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import "../globals.css"

import BuilderContextProvider from "@/providers/BuilderContextProvider"
import DesignerContextProvider from "@/providers/DesignerContextProvider"

import { fetchData } from "@/actions/data"

import { NavigationComponent } from "@/components/builder/layout/NavigationComponent/Component"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
    title: "blrplt builder",
    description: "the place where you can build a landing page quickly without any hassle",
    verification: {
        google: process.env.GOOGLE_VERIFICATION_CODE,
    },
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { user, sites } = await fetchData()
    // @ts-expect-error bc pages isn't typed
    const components = sites[0] ? sites[0].pages[0]?.components : []

    return (
        <main className="flex min-h-screen w-full flex-col">
            <BuilderContextProvider
                userId={user.id}
                userEmail={user.email}
                userSites={sites}
            >
                <DesignerContextProvider components={components}>
                    <NavigationComponent />
                    {children}
                    <Toaster />
                    <ReactQueryDevtools />
                </DesignerContextProvider>
            </BuilderContextProvider>
        </main>
    )
}
