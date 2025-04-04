"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useBuilderContext } from "@/providers/BuilderContextProvider"
import { createUuid } from "@/lib/utils"
import { componentDefaultValues } from "@/lib/components/defaultValues"
import {
    addDefaultOpenGraphValues,
    addDefaultTemplateSettingsValues,
    openGraphDefaultValues,
} from "@/lib/settings/defaultValues"
import { checkIfUrlIsAvailable } from "@/lib/urlCheck"

const formSchema = z.object({
    name: z.string().min(2).max(50),
    url: z.string().min(2).max(50),
})

export function CreateSiteForm({ setOpen }: { setOpen: () => void }) {
    const { user } = useBuilderContext()

    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            url: "",
        },
    })

    const checkUrl = async (url: string) => {
        form.clearErrors("url")
        setIsLoading(false)

        const formattedUrl = url.toLowerCase()
        const isAvailable = await checkIfUrlIsAvailable(formattedUrl)

        if (!isAvailable) {
            form.setValue("url", "")
            form.setError("url", {
                type: "manual",
                message: "url is already in use, please choose another one",
            })

            setIsLoading(false)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        setHasError(false)

        const formattedUrl = values.url.toLowerCase()
        const isAvailable = await checkIfUrlIsAvailable(formattedUrl)

        if (!isAvailable) {
            form.setValue("url", "")
            form.setError("url", {
                type: "manual",
                message: "url is already in use, please choose another one",
            })

            setIsLoading(false)
            return
        }

        const data = {
            name: values.name,
            url: formattedUrl,
            id: createUuid(),
            userId: user,
            settings: {
                template: addDefaultTemplateSettingsValues(),
                openGraph: addDefaultOpenGraphValues(values.name, values.url) 
            },
            pages: [
                {
                    name: "home",
                    id: createUuid(),
                    url: "/builder/pages/home",
                    components: [
                        {
                            id: createUuid(),
                            type: "header",
                            extraAttributes: {
                                description: componentDefaultValues.header.description,
                                subtitle: componentDefaultValues.header.subtitle,
                                title: componentDefaultValues.header.title,
                            }
                        },
                    ],
                },
            ],
        }

        const response = await fetch("/api/builder/create-site", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.status === 200) {
            setOpen()
        } else {
            setHasError(true)
        }

        setIsLoading(false)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="blrplt"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>this is your public website name.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>url</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="/blrplt"
                                    className="lowercase"
                                    {...field}
                                    onBlur={() => checkUrl(form.getValues("url"))}
                                />
                            </FormControl>
                            <FormDescription className="lowercase">{`your public display url will be https://builder.blrplt.dev/preview/${form.getValues("url")}.`}</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    disabled={isLoading}
                >
                    create website!
                </Button>
                {hasError && <p className="text-sm">error creating site. try again later</p>}
            </form>
        </Form>
    )
}
