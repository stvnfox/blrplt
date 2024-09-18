import { FunctionComponent, useEffect } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PlusIcon, XIcon } from "lucide-react"

import { ComponentElementInstance } from "@/components/builder/dashboard/Dashboard/ComponentElements/Component"
import { componentSchemas } from "@/lib/components/componentSchemas"
import { componentDefaultValues } from "@/lib/components/defaultValues"
import { positionOptions } from "@/lib/components/options"
import { useDesigner } from "@/lib/hooks/useDesigner"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileInput } from "@/components/ui/file-input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const formSchema = componentSchemas.feature

type FeaturePropertiesComponentProps = {
    instance: ComponentElementInstance
}

const MAX_FILE_SIZE = "5MB"
const MAX_FILE_SIZE_IN_BITS = 5 * 1024 * 1024 // MAX FILE SIZE OF 5MB
const ACCEPTED_FILES = "image/png, image/jpeg, image/jpg, image/svg+xml"

export const PropertiesComponent: FunctionComponent<FeaturePropertiesComponentProps> = ({ instance }) => {
    const { updateComponent } = useDesigner()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
            title: instance.extraAttributes?.title ?? componentDefaultValues.feature.title,
            description: instance.extraAttributes?.description ?? componentDefaultValues.feature.description,
            cta: instance.extraAttributes?.cta ?? undefined,
            image: instance.extraAttributes?.image ?? componentDefaultValues.feature.image,
        },
    })

    const ctaValue = form.watch("cta")

    const addCta = () => {
        form.setValue("cta", {
            label: "button label",
            href: "/",
            ariaLabel: "describe what the button does",
        })

        handleChanges(form.getValues())
    }

    const removeCta = () => {
        form.setValue("cta", undefined)

        handleChanges(form.getValues())
    }

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
                title: values.title,
                description: values.description,
                cta: values.cta,
                image: values.image,
            },
        })
    }

    useEffect(() => {
        form.reset({
            title: instance.extraAttributes?.title ?? componentDefaultValues.header.title,
            description: instance.extraAttributes?.description ?? componentDefaultValues.header.description,
            image: instance.extraAttributes?.image ?? componentDefaultValues.feature.image,
            cta: instance.extraAttributes?.cta ?? undefined,
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
                <div className="mt-6">
                    <Label
                        htmlFor="feature-image-block"
                        className="text-sm font-normal text-neutral-500"
                    >
                        image
                    </Label>
                    <div
                        id="feature-image-block"
                        className="mt-2 space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="image.src"
                            render={({ field }) => (
                                <FormItem className="mb-4 mt-2">
                                    <FormLabel>image</FormLabel>
                                    <FileInput
                                        fieldName="image.src"
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
                            name="image.alt"
                            render={({ field }) => (
                                <FormItem className="my-4">
                                    <FormLabel>alt text</FormLabel>
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
                            name="image.position"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>image position</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="select a position" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {positionOptions.map((option, index) => (
                                                <SelectItem
                                                    key={`option-${index}`}
                                                    value={option.value}
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
                    </div>
                    {ctaValue ? (
                        <div className="my-6">
                            <Label
                                htmlFor="feature-cta-block"
                                className="text-sm font-normal text-neutral-500"
                            >
                                call to action (optional)
                            </Label>
                            <div
                                id="feature-cta-block"
                                className="mt-2 space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="cta.label"
                                    render={({ field }) => (
                                        <FormItem className="mb-4 mt-2">
                                            <FormLabel>button label</FormLabel>
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
                                    name="cta.href"
                                    render={({ field }) => (
                                        <FormItem className="my-4">
                                            <FormLabel>button link</FormLabel>
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
                                    name="cta.ariaLabel"
                                    render={({ field }) => (
                                        <FormItem className="my-4">
                                            <FormLabel>aria label</FormLabel>
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
                                <Button
                                    className="shadow-none gap-2"
                                    type="button"
                                    variant="destructive"
                                    onClick={removeCta}
                                >
                                    <XIcon size={16} /> remove call to action
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <Button
                            className="gap-2 shadow-none mt-4"
                            variant="outline"
                            type="button"
                            onClick={addCta}
                        >
                            <PlusIcon size={16} /> add call to action
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    )
}
