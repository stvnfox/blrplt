"use server"

import { redirect } from "next/navigation"

import { logout } from "@/actions/auth"
import { createClient } from "@/lib/supabase/server"

export default async function Dashboard() {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect("/login")
    }

    return (
        <main className="flex min-h-screen items-center justify-center">
            blrplt builder - {data.user.email} -
            <form>
                <button formAction={logout} className="ml-1">logout</button>
            </form>
        </main>
    )
}
