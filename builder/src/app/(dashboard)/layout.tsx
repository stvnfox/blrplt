import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "../globals.css"

import { DashboardNavigation } from "@/components/builder/layout/DashboardNavigation"
import { ProfileNavigation } from "@/components/builder/layout/ProfileNavigation"
import { createClient } from "@/lib/supabase/server"

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
    const { data: site } = await (await supabase.from("site").select("*").eq("userId", data.user?.id))

    const pages = site ? site[0].pages : []


    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="my-8 mx-10">
                    <ProfileNavigation />
                    <section className="flex gap-4 my-10">
                        <DashboardNavigation items={pages}/>
                        {children}
                    </section>
                </main>
            </body>
        </html>
    )
}
