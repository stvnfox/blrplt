import { FunctionComponent, useEffect, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
    createDefaultOpenGraphValues,
    defaultTemplateSettingValues,
    openGraphDefaultValues,
} from "@/lib/settings/defaultValues"
import { templateSettingsSchema } from "@/lib/settings/settingsSchema"
import { templateOptions } from "@/lib/settings/options"
import { Template } from "@/lib/settings/types"
import { useBuilderContext } from "@/providers/BuilderContextProvider"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ColorPicker } from "@/components/ui/color-picker"
import { Button } from "@/components/ui/button"

const formSchema = z.object(templateSettingsSchema)

export const TemplateChooser: FunctionComponent = () => {
    const { sites } = useBuilderContext()
    const site = sites[0]

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // @ts-expect-error because of different options in settings
            template: site.settings.template ? site.settings.template : defaultTemplateSettingValues.template,
        },
    })

    const template = form.watch("template.choice")
    const [editValues, setEditValues] = useState(false)
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

    const createTemplateSettingsData = (data: z.infer<typeof formSchema>) => {
        return {
            id: site.id,
            settings: {
                template: data.template,
                openGraph:
                    // @ts-expect-error bc site.settings is not typed bc jsonb type
                    site.settings.openGraph ??
                    createDefaultOpenGraphValues(openGraphDefaultValues, site.url, site.name),
            },
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setStatus("loading")

        const response = await fetch("/api/builder/update-site-settings", {
            method: "POST",
            body: JSON.stringify(createTemplateSettingsData(values)),
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.status === 200) {
            setStatus("success")

            setTimeout(() => {
                setStatus("idle")
            }, 3000)
        } else {
            setStatus("error")
        }
    }

    const isNotCustomTemplate = form.getValues("template.choice") !== Template.Custom;
    const hasBackgroundColor = form.getValues("template.customOptions.backgroundColor") !== "";
    const hasTextColor = form.getValues("template.customOptions.textColor") !== "";
    const hasPrimaryColor = form.getValues("template.customOptions.primaryColor") !== "";
    const shouldResetCustomOptions = isNotCustomTemplate && hasBackgroundColor && hasTextColor && hasPrimaryColor;

    useEffect(() => {
        if (shouldResetCustomOptions) {
            form.setValue("template.customOptions", {
                backgroundColor: "",
                textColor: "",
                primaryColor: "",
                secondaryColor: "",
            })
        }
    }, [template])

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="template.choice"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>choose your preffered template style</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    {templateOptions.map((option) => (
                                        <FormItem
                                            key={option.value}
                                            id={option.value}
                                            className="flex items-center space-x-3 space-y-0"
                                        >
                                            <FormControl>
                                                <RadioGroupItem value={option.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal">{option.label}</FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {template === Template.Custom && (
                    <>
                        <FormDescription>
                            take caution! by choosing the custom option you are accepting that the responsibility for
                            keeping your landing page a11y proof. read more about this over{" "}
                            <a
                                href="https://www.w3.org/WAI/WCAG21/Understanding/use-of-color"
                                target="_blank"
                                rel="referrer noopener"
                                className="text-blue-500 underline underline-offset-2 transition-colors hover:text-blue-700"
                            >
                                here
                            </a>
                            .
                        </FormDescription>
                        <FormField
                            control={form.control}
                            name="template.customOptions.primaryColor"
                            disabled={!editValues}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>primary color</FormLabel>
                                    <FormControl>
                                        <ColorPicker
                                            isDisabled={!editValues}
                                            background={field.value}
                                            setBackground={(background) => field.onChange(background)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="template.customOptions.secondaryColor"
                            disabled={!editValues}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>secondary color</FormLabel>
                                    <FormControl>
                                        <ColorPicker
                                            isDisabled={!editValues}
                                            background={field.value}
                                            setBackground={(background) => field.onChange(background)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="template.customOptions.backgroundColor"
                            disabled={!editValues}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>background color</FormLabel>
                                    <FormControl>
                                        <ColorPicker
                                            isDisabled={!editValues}
                                            background={field.value}
                                            setBackground={(background) => field.onChange(background)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="template.customOptions.textColor"
                            disabled={!editValues}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>text color</FormLabel>
                                    <FormControl>
                                        <ColorPicker
                                            isDisabled={!editValues}
                                            background={field.value}
                                            setBackground={(background) => field.onChange(background)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}
                <div className="mt-4 flex items-center gap-6">
                    {editValues ? (
                        <Button
                            type="submit"
                            variant="outline"
                            className="shadow-none"
                            disabled={status === "loading"}
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
                                disabled={status === "loading"}
                            >
                                edit
                            </button>
                        </Button>
                    )}
                    {status === "error" && <p className="text-sm text-red-600">error updating site</p>}
                    {status === "success" && <p className="text-sm text-green-600">site updated!</p>}
                </div>
            </form>
        </Form>
    )
}
