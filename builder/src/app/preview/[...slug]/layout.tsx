import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { redirect } from "next/navigation"

import "../../globals.css"

import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/db"
import BuilderContextProvider from "@/providers/BuilderContextProvider"

const inter = Inter({ subsets: ["latin"] })

let title

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()
    
    if(error) {
        redirect("/login")
    }

    const sites = await prisma.site.findMany({
        where: {
            userId: data.user?.id
        }
    })

    title = sites[0].name

    return (
        <html lang="en">
            <body className={inter.className}>
                <BuilderContextProvider 
                    userId={data.user.id}
                    userSites={sites}
                >
                    {children}
                </BuilderContextProvider>
            </body>
        </html>
    )
}

// TODO: Fix title
export const metadata: Metadata = {
    title: title,
    description: "build by blrplt builder - the place where you can build a website quickly without any hassle",
}