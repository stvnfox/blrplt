"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { DynamicBuildPage } from "@/components/builder/pages/DynamicBuildPage";
import { createClient } from "@/lib/supabase/server";

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params

    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()

    const { data: pages } = await supabase.from("site").select("pages")
    const pageData = pages ? pages[0].pages.find((page: any) => page.name.toLowerCase() === slug) : []

    if(error) {
        revalidatePath("/", "layout")
        redirect("/")
    }

    return (
        <DynamicBuildPage 
            user={data.user?.id}
            data={pageData}
        />
    )
}