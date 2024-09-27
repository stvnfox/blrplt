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
import { FileInput } from "@/components/ui/file-input"

const formSchema = componentSchemas.image

type ImagePropertiesComponentProps = {
    instance: ComponentElementInstance
}

const MAX_FILE_SIZE = "5MB"
const MAX_FILE_SIZE_IN_BITS = 5 * 1024 * 1024 // MAX FILE SIZE OF 5MB
const ACCEPTED_FILES = "image/png, image/jpeg, image/jpg, image/svg+xml"

export const PropertiesComponent: FunctionComponent<ImagePropertiesComponentProps> = ({ instance }) => {
    const { updateComponent } = useDesigner()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
            src: instance.extraAttributes?.src ?? componentDefaultValues.image.src,
            alt: instance.extraAttributes?.alt ?? componentDefaultValues.image.alt,
            description: instance.extraAttributes?.description ?? componentDefaultValues.image.description,
        },
    })

    const handleChangeOnEnter = (
        e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (e.key === "Enter") {
            e.currentTarget.blur()
        }
    }

    const handleChanges = (values: z.infer<typeof formSchema>) => {
        updateComponent(instance.id, {
            ...instance,
            extraAttributes: {
                ...instance.extraAttributes,
                src: values.src,
                alt: values.alt,
                description: values.description,
            },
        })
    }

    useEffect(() => {
        form.reset({
            src: instance.extraAttributes?.src ?? componentDefaultValues.image.src,
            alt: instance.extraAttributes?.alt ?? componentDefaultValues.image.alt,
            description: instance.extraAttributes?.description ?? componentDefaultValues.image.description,
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
                    name="src"
                    render={({ field }) => (
                        <FormItem className="mb-4 mt-2">
                            <FormLabel>image</FormLabel>
                            <FileInput
                                fieldName="src"
                                acceptedFiles={ACCEPTED_FILES}
                                maxFileSizeInBits={MAX_FILE_SIZE_IN_BITS}
                                maxFileSize={MAX_FILE_SIZE}
                                value={field.value}
                                submitFunction={form.handleSubmit(handleChanges)}
                            />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="alt"
                    render={({ field }) => (
                        <FormItem className="my-4">
                            <FormLabel>alt text (optional)</FormLabel>
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
                            <FormLabel>description (optional)</FormLabel>
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
