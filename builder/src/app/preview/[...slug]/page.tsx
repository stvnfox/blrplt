// "use client"

import { DynamicPreviewPage } from "@/components/builder/pages/DynamicPreviewPage"

export default async function Preview({ params }: { params: { slug: string } }) {
    const { slug } = params

    return (
        <DynamicPreviewPage slug={slug} />
    )
}
