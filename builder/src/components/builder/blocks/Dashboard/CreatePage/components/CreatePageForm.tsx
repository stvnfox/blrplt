"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"

import { useBuilderContext } from "@/providers/BuilderContextProvider"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

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

export function CreatePageForm({children}: {children: React.ReactNode}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            // url: "",
            // components: []
        },
    })

    const router = useRouter()
    const { sites } = useBuilderContext() 

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const data = {
            siteId: sites[0].id,
            pages: sites[0].pages,
            name: values.name,
            url: `/builder/pages/${values.name}`,
            id: 2,
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

        const response = await fetch('/api/builder/create-page', {
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
                            <FormMessage />
                        </FormItem>
                    )}
                />
                { children && (
                    <>
                        {children}
                    </>
                )}
                
            </form>
        </Form>
    )
}
