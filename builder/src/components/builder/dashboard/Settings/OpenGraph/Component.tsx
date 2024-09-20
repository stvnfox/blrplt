"use client"

import { FunctionComponent, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useBuilderContext } from "@/providers/BuilderContextProvider"
import {
    createDefaultOpenGraphValues,
    createDefaultTemplateSettingsValues,
    defaultTemplateSettingValues,
    openGraphDefaultValues,
} from "@/lib/settings/defaultValues"
import { OpenGraphDefaultValues } from "@/lib/settings/types"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { FileInput } from "@/components/ui/file-input"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const MAX_FILE_SIZE = "5MB"
const MAX_FILE_SIZE_IN_BITS = 5 * 1024 * 1024 // MAX FILE SIZE OF 5MB
const ACCEPTED_FILES = "image/png, image/jpeg, image/jpg, image/svg+xml"

const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(50),
    image: z
        .object({
            url: z.string(),
            extension: z.string(),
            path: z.string(),
        })
        .refine((data) => data.url !== "", { message: "Please upload an image." }),
})

export const OpenGraph: FunctionComponent = () => {
    const { sites } = useBuilderContext()
    const site = sites[0]

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: createDefaultOpenGraphValues(
            openGraphDefaultValues,
            site.url,
            site.name,
            //@ts-expect-error bc site.settings is not typed bc jsonb type
            site.settings ? (site.settings.openGraph as OpenGraphDefaultValues) : null
        ),
    })

    const [editValues, setEditValues] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSucceeded, setIsSucceeded] = useState(false)
    const [hasError, setHasError] = useState(false)

    const createOpenGraphSettingsData = (values: z.infer<typeof formSchema>) => {
        return {
            title: values.title,
            description: values.description,
            type: openGraphDefaultValues.type,
            url: site.url,
            image: values.image,
        }
    }

    const updateSettings = async (values: z.infer<typeof formSchema>) => {
        const data = {
            id: site.id,
            settings: {
                // @ts-expect-error bc site.settings is not typed bc jsonb type
                template: site.settings.template ?? createDefaultTemplateSettingsValues(defaultTemplateSettingValues),
                openGraph: createOpenGraphSettingsData(values),
            },
        }

        const response = await fetch("/api/builder/update-site-settings", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.status === 200) {
            return true
        } else {
            return false
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        setHasError(false)
        setEditValues(false)

        const response = await updateSettings(values)

        if (response) {
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
        <section className="px-4 md:px-8">
            <div className="rounded-md border border-neutral-100 px-6 py-4">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>title</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={!editValues}
                                            {...field}
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
                                            disabled={!editValues}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem className="!pb-3">
                                    <FormLabel>image</FormLabel>
                                    <FileInput
                                        fieldName="image"
                                        disabled={!editValues}
                                        acceptedFiles={ACCEPTED_FILES}
                                        maxFileSizeInBits={MAX_FILE_SIZE_IN_BITS}
                                        maxFileSize={MAX_FILE_SIZE}
                                        value={field.value}
                                        submitFunction={() => updateSettings(form.getValues())}
                                    />
                                </FormItem>
                            )}
                        />
                        <div className="mt-4 flex items-center gap-6">
                            {editValues ? (
                                <Button
                                    type="submit"
                                    variant="outline"
                                    disabled={isLoading}
                                >
                                    save
                                </Button>
                            ) : (
                                <Button
                                    asChild
                                    onClick={() => setEditValues(true)}
                                >
                                    <button
                                        type="button"
                                        disabled={isLoading}
                                    >
                                        edit
                                    </button>
                                </Button>
                            )}
                            {hasError && <p className="text-sm text-red-600">error updating site</p>}
                            {isSucceeded && <p className="text-sm text-green-600">site updated!</p>}
                        </div>
                    </form>
                </Form>
            </div>
        </section>
    )
}
