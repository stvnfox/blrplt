"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

export async function login(formData: FormData) {
    const supabase = createClient()

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect("/error")
    }

    revalidatePath("/", "layout")
    redirect("/")
}

export async function logout() {
    const supabase = createClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
        redirect("/error")
    }

    revalidatePath("/", "layout")
    redirect("/")
}

export async function signup(email: string, password: string) {
    const supabase = createClient()

    const data = {
        email: email,
        password: password,
    }

    const { error } = await supabase.auth.signUp(data)

    // TODO: Handle various error states
    if (error) {
        redirect("/error")
    }

    return {
        status: "success",
        message: "your account has been created, please check your email to verify your account",
    }
}

export async function resetPassword(email: string) {
    const supabase = createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3001/update-password",
    })

    if (error) {
        redirect("/error")
    }

    return { message: "succeeded" }
}

export async function updatePassword(password: string) {
    const supabase = createClient()

    const { error } = await supabase.auth.updateUser({
        password: password,
    })

    if (error) {
        switch (error.code) {
            case "same_password":
                return { status: "failed", message: "new password should be different from the old password" }
            default:
                return { status: "failed", message: "something went wrong" }
        }
        // TODO: Add more error handling
    }

    return { status: "success", message: "your password is succesfully changed!" }
}
