"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useBuilderContext } from "@/providers/BuilderContextProvider"
import { createUuid } from "@/lib/utils"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
    name: z.string().min(2).max(50),
    // url: z.string().min(2).max(50),
    // components: z.array(z.object({
    //     name: z.string(),
    //     type: z.string(),
    //     data: z.object({
    //         title: z.string(),
    //         subtitle: z.string(),
    //         description: z.string(),
    //     })
    // }))
})

export function CreatePageForm({ setOpen }: { setOpen: () => void }) {
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            // url: "",
            // components: []
        },
    })

    const { sites } = useBuilderContext()

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        setHasError(false)

        const data = {
            siteId: sites[0].id,
            pages: sites[0].pages,
            name: values.name,
            url: `/builder/pages/${values.name}`,
            id: createUuid(),
            components: [
                {
                    name: "Header",
                    type: "header",
                    data: {
                        title: "Welcome to blrplt",
                        subtitle: "The best website builder",
                        description: "Create your website with blrplt.",
                    },
                },
            ],
        }

        const response = await fetch("/api/builder/create-page", {
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
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    disabled={isLoading}
                >
                    create page!
                </Button>
                {hasError && <p className="text-sm">error creating site. try again later</p>}
            </form>
        </Form>
    )
}
