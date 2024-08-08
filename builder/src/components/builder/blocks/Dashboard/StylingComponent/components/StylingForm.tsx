"use client"

import { FunctionComponent, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useBuilderContext } from "@/providers/BuilderContextProvider"
import { createDefaultSettingsValues, settingsDefaultValues } from "@/lib/settings/defaultValues"
import { buttonStyleOptions, fontStyleOptions } from "@/lib/settings/options"
import { settingsSchema } from "@/lib/settings/settingsSchema"
import { SettingsDefaultValues } from "@/lib/settings/types"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ColorPicker } from "@/components/ui/color-picker"
import { Accordion } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StylingItem } from "./StylingItem"

const formSchema = z.object(settingsSchema)

export const StylingForm: FunctionComponent = () => {
    const { sites } = useBuilderContext()
    const site = sites[0]

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        //@ts-expect-error bc site.settings is not typed bc jsonb type
        defaultValues: createDefaultSettingsValues(settingsDefaultValues, site.settings as SettingsDefaultValues),
    })

    const [editValues, setEditValues] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSucceeded, setIsSucceeded] = useState(false)
    const [hasError, setHasError] = useState(false)

    const createSettingsData = (values: z.infer<typeof formSchema>) => {
        return {
            background: {
                primary: values.background.primary,
                secondary: values.background.secondary,
                tertiary: values.background.tertiary,
            },
            text: {
                primary: values.text.primary,
                secondary: values.text.secondary,
                tertiary: values.text.tertiary,
            },
            headings: {
                primary: values.headings.primary,
                secondary: values.headings.secondary,
            },
            font: {
                style: values.font.style,
            },
            buttons: {
                primary: {
                    background: "#000000",
                    text: "#ffffff",
                },
                secondary: {
                    background: "#ffffff",
                    text: "#000000",
                },
                style: "default",
            }
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        setHasError(false)
        setEditValues(false)

        const data = {
            id: site.id,
            settings: createSettingsData(values),
        }

        const response = await fetch("/api/builder/update-site-settings", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.status === 200) {
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
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <Accordion
                    type="multiple"
                    // defaultValue={["colors-component"]}
                >
                    <StylingItem
                        value="colors-component"
                        title="colors"
                    >
                        <FormDescription className="text-base">background</FormDescription>
                        <FormField
                            control={form.control}
                            name="background.primary"
                            disabled={!editValues}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>background - primary color</FormLabel>
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
                            name="background.secondary"
                            disabled={!editValues}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>background - secondary color</FormLabel>
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
                            name="background.tertiary"
                            disabled={!editValues}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>background - tertiary color</FormLabel>
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
                        <FormDescription className="text-base">text</FormDescription>
                        <FormField
                            control={form.control}
                            name="text.primary"
                            disabled={!editValues}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>text - primary color</FormLabel>
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
                            name="text.secondary"
                            disabled={!editValues}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>text - secondary color</FormLabel>
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
                            name="text.tertiary"
                            disabled={!editValues}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>text - tertiary color</FormLabel>
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
                        <FormDescription className="text-base">headings</FormDescription>
                        <FormField
                            control={form.control}
                            name="headings.primary"
                            disabled={!editValues}
                            render={({ field }) => (
                                <FormItem className="!mb-3">
                                    <FormLabel>headings - primary color</FormLabel>
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
                            name="headings.secondary"
                            disabled={!editValues}
                            render={({ field }) => (
                                <FormItem className="!mb-3">
                                    <FormLabel>headings - secondary color</FormLabel>
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
                    </StylingItem>
                    <StylingItem
                        value="fonts-component"
                        title="fonts"
                        className="py-4"
                    >
                        <FormField
                            control={form.control}
                            name="font.style"
                            render={({ field }) => (
                                <FormItem className="!mb-3">
                                    <FormLabel>font style</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={!editValues}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="select a font style" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {fontStyleOptions.map((option, index) => (
                                                <SelectItem
                                                    key={`option-${index}`}
                                                    disabled={option.disabled}
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
                    </StylingItem>
                    <StylingItem
                        value="buttons-component"
                        title="buttons"
                        className="py-4"
                        last
                    >
                        <FormDescription className="text-base">primary button</FormDescription>
                        <FormField
                            control={form.control}
                            name="buttons.primary.background"
                            disabled={!editValues}
                            render={({ field }) => (
                                <FormItem className="!mb-3">
                                    <FormLabel>primary button - background color</FormLabel>
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
                            name="buttons.primary.text"
                            disabled={!editValues}
                            render={({ field }) => (
                                <FormItem className="!mb-3">
                                    <FormLabel>primary button - text color</FormLabel>
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
                        <FormDescription className="text-base">secondary button</FormDescription>
                        <FormField
                            control={form.control}
                            name="buttons.secondary.background"
                            disabled={!editValues}
                            render={({ field }) => (
                                <FormItem className="!mb-3">
                                    <FormLabel>secondary button - background color</FormLabel>
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
                            name="buttons.secondary.text"
                            disabled={!editValues}
                            render={({ field }) => (
                                <FormItem className="!mb-3">
                                    <FormLabel>secondary button - text color</FormLabel>
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
                            name="buttons.style"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>button style</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={!editValues}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="select a button style" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {buttonStyleOptions.map((option, index) => (
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
                    </StylingItem>
                </Accordion>
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
    )
}
