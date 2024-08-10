"use client"

import { FunctionComponent, useEffect, useRef, useState } from "react"
import { Trash2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useBuilderContext } from "@/providers/BuilderContextProvider"
import { createDefaultOpenGraphValues, openGraphDefaultValues } from "@/lib/settings/defaultValues"
import { OpenGraphDefaultValues } from "@/lib/settings/types"
import { createClient } from "@/lib/supabase/client"
import { createUuid } from "@/lib/utils"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const MAX_FILE_SIZE = "5MB"
const MAX_FILE_SIZE_IN_BITS = 5 * 1024 * 1024 // MAX FILE SIZE OF 5MB
const ACCEPTED_FILES = "image/png, image/jpeg, image/jpg, image/svg+xml"

const formSchema = z.object({
    // title: z.string().min(2).max(50),
    // description: z.string().min(2).max(50),
    // type: z.string().min(2).max(50),
    // url: z.string().min(2).max(50),
    image: z.object(
        {
            url: z.string(),
            extension: z.string(),
            path: z.string(),
        }).refine((data) => data.url !== "", { message: "Please upload an image." }),
})

export const OpenGraph: FunctionComponent = () => {
    const { sites, user } = useBuilderContext()
    const site = sites[0]
    const supabase = createClient()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: createDefaultOpenGraphValues(
            openGraphDefaultValues,
            //@ts-expect-error bc site.settings is not typed bc jsonb type
            site.settings ? (site.settings.openGraph as OpenGraphDefaultValues) : null
        ),
    })

    const [editValues, setEditValues] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [isSucceeded, setIsSucceeded] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [imageIsUploading, setImageIsUploading] = useState(true)
    const imageRef = useRef<HTMLInputElement>(null)

    const createOpenGraphSettingsData = (values: z.infer<typeof formSchema>) => {
        return {
            // title: values.title,
            // description: values.description,
            // type: openGraphDefaultValues.type,
            // url: values.url,
            image: values.image,
        }
    }

    const uploadImage = async (e: any) => {
        form.clearErrors("image")

        const file = e.target.files[0]
        if (file.size > MAX_FILE_SIZE_IN_BITS) {
            form.setError("image", {
                type: "image",
                message: `File size is too large. Please upload a file smaller than ${MAX_FILE_SIZE}.`,
            })

            imageRef.current ? (imageRef.current.value = "") : null

            return
        }

        setImageIsUploading(true)
        const { data, error } = await supabase.storage.from("images").upload(user + "/" + createUuid(), file)

        if (error) {
            form.setError("image", {
                type: "image",
                message: "something went wrong, please try again",
            })

            return
        }

        if (data) {
            const { data: urlData } = await supabase.storage.from("images").getPublicUrl(data?.path)

            if (!urlData.publicUrl) {
                form.setError("image", {
                    type: "manual",
                    message: "something went wrong, please try again",
                })

                return
            }

            setPreviewUrl(urlData.publicUrl)
            form.setValue("image", {
                url: urlData.publicUrl,
                extension: file.type,
                path: data.path,
            })

            updateSettings(form.getValues())
        }

        setImageIsUploading(false)
    }

    const removeImage = async () => {
        const { error } = await supabase.storage.from("images").remove([form.getValues("image.path")])

        if (error) {
            form.setError("image", {
                type: "manual",
                message: "something went wrong, please try again",
            })

            return
        }

        setPreviewUrl(null)
        form.setValue("image", {
            url: "",
            extension: "",
            path: "",
        })

        updateSettings(form.getValues())
    }

    const updateSettings = async (values: z.infer<typeof formSchema>) => {
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

    useEffect(() => {
        if (form.getValues("image.url") !== "") {
            setPreviewUrl(form.getValues("image.url"))
        }

        setTimeout(() => {
            setImageIsUploading(false)
        }, 750)
    }, [])

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
                            name="image"
                            disabled={!editValues}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>image</FormLabel>
                                    {imageIsUploading ? (
                                        <div
                                            className="text-surface block h-8 w-8 animate-spin rounded-full border-2 border-dashed border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                                            role="status"
                                        >
                                            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                                Loading...
                                            </span>
                                        </div>
                                    ) : (
                                        <>
                                            {previewUrl ? (
                                                <div className="relative w-fit">
                                                    <img
                                                        src={previewUrl}
                                                        className="h-40 w-40 rounded object-contain"
                                                    />
                                                    <Button
                                                        variant={null}
                                                        type="button"
                                                        className="absolute -right-10 top-0 transition-colors hover:text-red-600"
                                                        onClick={removeImage}
                                                    >
                                                        <Trash2 />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <>
                                                    <FormControl>
                                                        <Input
                                                            type="file"
                                                            className="!mt-1 focus-visible:ring-2"
                                                            accept={ACCEPTED_FILES}
                                                            ref={imageRef}
                                                            onChange={(e) => uploadImage(e)}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>upload a image </FormDescription>
                                                </>
                                            )}
                                            <FormMessage />
                                        </>
                                    )}
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
