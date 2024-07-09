"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { UserSite } from "@/providers/BuilderContextProvider"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FunctionComponent, useState } from "react"
import clsx from "clsx"

interface UpdateSiteFormProps {
    site: UserSite
}

const formSchema = z.object({
    name: z.string().min(2).max(50),
    url: z.string().min(2).max(50),
})

export const UpdateSiteForm: FunctionComponent<UpdateSiteFormProps> = ({ site }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: site.name,
            url: site.url,
        },
    })

    const [editValues, setEditValues] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSucceeded, setIsSucceeded] = useState(false)
    const [hasError, setHasError] = useState(false)

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setEditValues(false)
        setIsLoading(true)
        setHasError(false)

        const data = {
            ...site,
            name: values.name,
            url: values.url,
        }

        const response = await fetch("/api/builder/update-site-info", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })

        if(response.status === 200) {
            setIsSucceeded(true)

            setTimeout(() => {
                setIsSucceeded(false)
            }, 3000)
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
                    disabled={!editValues}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>name</FormLabel>
                            <FormControl>
                                <Input
                                    className="rounded shadow-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="url"
                    disabled={!editValues}
                    render={({ field }) => (
                        <FormItem className={clsx(!editValues && "!mb-3")}>
                            <FormLabel>url</FormLabel>
                            <FormControl>
                                <Input
                                    className="rounded shadow-none"
                                    {...field}
                                />
                            </FormControl>
                            {editValues && (
                                <FormDescription>{`your public display url is https://blrplt.dev/preview/${site.url}.`}</FormDescription>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {editValues ? (
                    <Button type="submit">save</Button>
                ) : (
                    <Button
                        asChild
                        onClick={() => setEditValues(true)}
                    >
                        <button type="button" disabled={isLoading}>edit</button>
                    </Button>
                )}
                {hasError && <p className="text-sm">error updating site</p>}
                {isSucceeded && <p className="text-sm">site updated!</p>}
            </form>
        </Form>
    )
}
