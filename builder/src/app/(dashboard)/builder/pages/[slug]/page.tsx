"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { DynamicBuilderPage } from "@/components/builder/pages/DynamicBuilderPage";
import { createClient } from "@/lib/supabase/server";

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params

    const supabase = createClient()

    const { error } = await supabase.auth.getUser()

    const { data: pages } = await supabase.from("site").select("pages")
    const pageData = pages ? pages[0].pages.find((page: any) => page.name.toLowerCase() === slug) : []

    if(error) {
        revalidatePath("/", "layout")
        redirect("/")
    }

    return (
        <DynamicBuilderPage 
            data={pageData}
        />
    )
}