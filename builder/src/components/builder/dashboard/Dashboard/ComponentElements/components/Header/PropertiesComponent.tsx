import { FunctionComponent, useEffect } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { ComponentElementInstance } from "@/components/builder/dashboard/Dashboard/ComponentElements/Component"
import { componentSchemas } from "@/lib/components/componentSchemas"
import { componentDefaultValues } from "@/lib/components/defaultValues"
import { useDesigner } from "@/lib/hooks/useDesigner"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = componentSchemas.header

type HeaderPropertiesComponentProps = {
    instance: ComponentElementInstance
}

export const PropertiesComponent: FunctionComponent<HeaderPropertiesComponentProps> = ({ instance }) => {
    const { updateComponent } = useDesigner()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
            title: instance.extraAttributes?.title ?? componentDefaultValues.header.title,
            subtitle: instance.extraAttributes?.subtitle ?? componentDefaultValues.header.subtitle,
            description: instance.extraAttributes?.description ?? componentDefaultValues.header.description,
        },
    })

    const handleChangeOnEnter = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.currentTarget.blur()
        }
    }

    const handleChanges = (values: z.infer<typeof formSchema>) => {
        updateComponent(instance.id, {
            ...instance,
            extraAttributes: {
                ...instance.extraAttributes,
                title: values.title,
                subtitle: values.subtitle,
                description: values.description,
            },
        })
    }

    useEffect(() => {
        form.reset({
            title: instance.extraAttributes?.title ?? componentDefaultValues.header.title,
            subtitle: instance.extraAttributes?.subtitle ?? componentDefaultValues.header.subtitle,
            description: instance.extraAttributes?.description ?? componentDefaultValues.header.description,
        })
    }, [instance, form])

    return (
        <Form {...form}>
            <form
                className="space-y-4"
                onBlur={form.handleSubmit(handleChanges)}
                onSubmit={(e) => e.preventDefault()}
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="mt-4">
                            <FormLabel>title</FormLabel>
                            <FormControl>
                                <Input
                                    className="rounded shadow-none"
                                    {...field}
                                    onKeyDown={(e) => handleChangeOnEnter(e)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subtitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>subtitle</FormLabel>
                            <FormControl>
                                <Input
                                    className="rounded shadow-none"
                                    {...field}
                                    onKeyDown={(e) => handleChangeOnEnter(e)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>description</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="rounded shadow-none"
                                    {...field}
                                    onKeyDown={(e) => handleChangeOnEnter(e)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
