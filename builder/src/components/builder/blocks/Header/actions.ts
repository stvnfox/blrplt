"use server"

import { createClient } from "@/lib/supabase/server"

export async function save(formData: FormData, page: string) {
    const supabase = createClient()

    // const data = {
    //     email: formData.get("email") as string,
    //     password: formData.get("password") as string,
    // }

    const { data } = await supabase.auth.getUser()
    console.log("data:", data)
    console.log("formData", formData)
    console.log("page", page)
    // if (error) {
    //     redirect("/error")
    // }

    // revalidatePath("/", "layout")
    // redirect("/")
}