import { createClient } from "@/lib/supabase/server"

export default async function Preview({ params }: { params: { slug: string } }) {
    const { slug } = params

    const supabase = createClient()

    const { data: pages } = await supabase.from("site").select("pages")
    const components = pages ? pages[0].pages[0].components : []

    return (
        <main className="m-8">
            <h2>{slug}</h2>
            <header className="mt-16 text-center">
                <h1 className="text-7xl mb-2">{components[0].data.title}</h1>
                <h2 className="text-3xl mb-5">{components[0].data.subtitle}</h2>
                <p className="text-sm">{components[0].data.description}</p>
            </header>
        </main>
    )
}
