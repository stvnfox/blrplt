"use client"

import { FunctionComponent, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useBuilderContext } from "@/providers/BuilderContextProvider"
import { createDefaultOpenGraphValues, openGraphDefaultValues } from "@/lib/settings/defaultValues"
import { OpenGraphDefaultValues } from "@/lib/settings/types"

const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(50),
    type: z.string().min(2).max(50),
    url: z.string().min(2).max(50),
    image: z.string().min(2).max(50),
})

export const OpenGraph: FunctionComponent = () => {
    const { sites } = useBuilderContext()
    const site = sites[0]

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: createDefaultOpenGraphValues(
            openGraphDefaultValues,
            //@ts-expect-error bc site.settings is not typed bc jsonb type
            site.settings[0] ? site.settings[0].openGraph as OpenGraphDefaultValues : null
        ),
    })

    const [editValues, setEditValues] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSucceeded, setIsSucceeded] = useState(false)
    const [hasError, setHasError] = useState(false)

    const createOpenGraphSettingsData = (values: z.infer<typeof formSchema>) => {
        return {
            openGraph: {
                title: values.title,
                description: values.description,
                type: openGraphDefaultValues.type,
                url: values.url,
                image: values.image,
            },
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        setHasError(false)
        setEditValues(false)

        const data = {
            id: site.id,
            // @ts-expect-error bc site.settings is not typed bc jsonb type
            settings: { style: site.settings.style, openGraph: createOpenGraphSettingsData(values) },
        }

        const response = await fetch("/api/builder/update-site-settings", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.status === 200) {
            setIsSucceeded(true)

            setTimeout(() => {
                setIsSucceeded(false)
            }, 3000)
        } else {
            setHasError(true)
        }

        setIsLoading(false)
    }

    return <>{JSON.stringify(site.settings)}</>
}
