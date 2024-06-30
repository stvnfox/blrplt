"use client"

import { createClient } from "@/lib/supabase/client"
import { useRef, useState } from "react"

// import { save } from "./actions"

export const Header = ({data, slug}: {data: any; slug: string}) => {
    const supabase = createClient()

    const [title, setTitle] = useState(data.data ? data.data.title : '')
    const [subtitle, setSubtitle] = useState(data.data ? data.data.subtitle : '')
    const [description, setDescription] = useState(data.data ? data.data.description : '')
    const [saved, setSaved] = useState(false)
    
    const submit = async () => {
        const {data, error} = await supabase.from("site").update({
            pages: [
                {
                    name: "Home",
                    id: 1,
                    url: "/builder/pages/home",
                    components: [
                        {
                            name: "Header",
                            data: {
                                title: title,
                                subtitle: subtitle,
                                description: description,
                            }
                        }
                    ]
                },
            ]
        }).eq("userId", "3850a80d-d62c-4101-b0ea-85ee36e4d77e").select("*")

        if(data) {
            setSaved(true)

            setTimeout(() => {
                setSaved(false)
            }, 4000)
        }
    }

    return (
        <section className="p-4 mt-2 border rounded w-full">
            <h2 className="text-2xl mb-2">Header</h2>
            <form>
                <div className="flex flex-col mb-2">
                    <label
                        htmlFor="header-title"
                        className="text-sm"
                    >
                        Title
                    </label>
                    <input
                        value={title}
                        id="header-title"
                        name="header-title"
                        type="text"
                        className="rounded border p-2 transition-colors hover:border-neutral-600 focus:outline-black"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mb-2">
                    <label
                        htmlFor="header-subtitle"
                        className="text-sm"
                    >
                        Subtitle
                    </label>
                    <input
                        value={subtitle}
                        id="header-subtitle"
                        name="header-subtitle"
                        type="text"
                        className="rounded border p-2 transition-colors hover:border-neutral-600 focus:outline-black"
                        required
                        onChange={(e) => setSubtitle(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mb-2">
                    <label
                        htmlFor="header-description"
                        className="text-sm"
                    >
                        Description
                    </label>
                    <textarea
                        value={description}
                        id="header-description"
                        name="header-description"
                        // defaultValue={data.data.description}
                        className="rounded border p-2 transition-colors hover:border-neutral-600 focus:outline-black"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <button
                        className="mt-2 rounded border-2 border-black bg-black p-2 text-sm text-white transition-colors hover:bg-white hover:text-black focus:outline-dashed focus:outline-offset-2 focus:outline-black"
                        formAction={submit}
                    >
                        Save
                    </button>
                    {saved ? (
                        <p className="mt-2 text-sm text-green-500">Saved!</p>
                    ) : null}
                </div>
            </form>
        </section>
    )
}
