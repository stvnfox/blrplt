"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/db"

export async function fetchData() {
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

    return { user: data.user, sites}
}