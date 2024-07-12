"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useBuilderContext } from "@/providers/BuilderContextProvider"
import { ComponentOption, componentOptions } from "@/lib/components/options"
import { addDefaultComponentValues } from "@/lib/components/defaultValues"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
    component: z.string().min(1, { message: "Please select a component" }),
    // defaultComponentValues: z.boolean().default(true),
})

export const ComponentSelector = ({ setOpen }: { setOpen: () => void }) => {
    const { sites } = useBuilderContext()

    const isOptionDisabled = (option: ComponentOption) => {
        if(option.disabled) return true

        return sites[0]?.pages[0]?.components.findIndex((component: any) => component.type === option.value) !== -1 ? true : false
    }

    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            component: "",
            // defaultComponentValues: true,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        setHasError(false)

        const pageComponents = sites[0]?.pages[0]?.components
        pageComponents.push({
            order: pageComponents.length,
            type: values.component,
            data: addDefaultComponentValues(values.component),
        })

        const data = {
            siteId: sites[0].id,
            pageId: sites[0].pages[0]?.id,
            components: pageComponents,
        }

        const response = await fetch("/api/builder/update-components", {
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
                className="space-y-6"
            >
                <FormField
                    control={form.control}
                    name="component"
                    render={({ field }) => (
                        <FormItem>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a component" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {componentOptions.map((option, index) => (
                                        <SelectItem
                                            key={`option-${index}`}
                                            value={option.value}
                                            disabled={isOptionDisabled(option)}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* TODO: Add default component values when types are available */}
                {/* <FormField
                    control={form.control}
                    name="defaultComponentValues"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormLabel className="text-sm font-normal text-neutral-500">
                                add default component values
                            </FormLabel>
                        </FormItem>
                    )}
                /> */}
                <Button
                    type="submit"
                    disabled={isLoading}
                >
                    add component!
                </Button>
                {hasError && <p className="text-sm">error adding component. try again later</p>}
            </form>
        </Form>
    )
}
