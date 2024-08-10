import { FunctionComponent, useEffect, useRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import { Trash2 } from "lucide-react"

import { createUuid } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { useBuilderContext } from "@/providers/BuilderContextProvider"

import { Button } from "@/components/ui/button"
import { FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type FileInputProps = {
    value: {
        url: string
        extension: string
        path: string
    }
    fieldName: string
    acceptedFiles: string
    maxFileSize: string
    maxFileSizeInBits: number
    submitFunction: any
    disabled?: boolean
}

export const FileInput: FunctionComponent<FileInputProps> = ({
    value,
    fieldName,
    acceptedFiles,
    maxFileSize,
    maxFileSizeInBits,
    submitFunction,
    disabled = false,
}) => {
    const { setError, clearErrors, setValue } = useFormContext()

    const [imageIsUploading, setImageIsUploading] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const imageRef = useRef<HTMLInputElement>(null)

    const { user } = useBuilderContext()
    const supabase = createClient()

    const uploadImage = async (e: any) => {
        clearErrors(fieldName)

        const file = e.target.files[0]
        if (file.size > maxFileSizeInBits) {
            setError(fieldName, {
                type: "manual",
                message: `File size is too large. Please upload a file smaller than ${maxFileSize}.`,
            })

            imageRef.current ? (imageRef.current.value = "") : null

            return
        }

        setImageIsUploading(true)
        const { data, error } = await supabase.storage.from("images").upload(user + "/" + createUuid(), file)

        if (error) {
            setError(fieldName, {
                type: "manual",
                message: "something went wrong, please try again",
            })

            return
        }

        if (data) {
            const { data: urlData } = await supabase.storage.from("images").getPublicUrl(data?.path)

            if (!urlData.publicUrl) {
                setError(fieldName, {
                    type: "manual",
                    message: "something went wrong, please try again",
                })

                return
            }

            setPreviewUrl(urlData.publicUrl)
            setValue(fieldName, {
                url: urlData.publicUrl,
                extension: file.type,
                path: data.path,
            })

            submitFunction()
        }

        setImageIsUploading(false)
    }

    const removeImage = async () => {
        const { error } = await supabase.storage.from("images").remove([value.path])

        if (error) {
            setError(fieldName, {
                type: "manual",
                message: "something went wrong, please try again",
            })

            return
        }

        setPreviewUrl(null)
        setValue(fieldName, {
            url: "",
            extension: "",
            path: "",
        })

        submitFunction()
    }

    useEffect(() => {
        if (value.url !== "") {
            setPreviewUrl(value.url)
        }

        setTimeout(() => {
            setImageIsUploading(false)
        }, 750)
    }, [])

    return (
        <>
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
                                disabled={disabled}
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
                                    ref={imageRef}
                                    type="file"
                                    className="!mt-1 focus-visible:ring-2"
                                    disabled={disabled}
                                    accept={acceptedFiles}
                                    onChange={(e) => uploadImage(e)}
                                />
                            </FormControl>
                        </>
                    )}
                    <FormMessage />
                </>
            )}
        </>
    )
}
