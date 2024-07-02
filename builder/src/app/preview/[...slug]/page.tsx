// "use client"

import { DynamicPreviewPage } from "@/components/builder/pages/DynamicPreviewPage"

export default async function Preview({ params }: { params: { slug: string } }) {
    const { slug } = params
    // const { sites } = usePreviewContext()
    // const supabase = createClient()
    // console.log(sites)
    // const { data: pages } = await supabase.from("site").select("pages")
    // console.log(pages)

    return (
        <DynamicPreviewPage slug={slug} />
    )
}
