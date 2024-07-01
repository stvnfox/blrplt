"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    name: z.string().min(2).max(50),
    url: z.string().min(2).max(50),
})

export function CreateSiteForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            url: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const data = {
            name: values.name,
            url: values.url,
            id: "2212a80d-d62c-4101-b0ea-85ee36e4d77e",
            userId: "01e28350-3361-48ae-80f5-4225ddacefb7",
            pages: [
                {
                    name: "Home",
                    id: 1,
                    url: "/builder/pages/home",
                    components: [
                        {
                            name: "Header",
                            type: "header",
                            data: {
                                title: "Welcome to blrplt",
                                subtitle: "The best website builder",
                                description: "Create your website with blrplt.",
                            }
                        }
                    ]
                }
            ]
        }

        const response = await fetch('/api/builder/create-site', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // TODO: Create error state
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
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>{`Your public display url will be https://blrplt.dev/preview/${form.getValues('url')}.`}</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">create website!</Button>
            </form>
        </Form>
    )
}
