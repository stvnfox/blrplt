"use client"

import { FunctionComponent } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"

import { ComponentProps } from "@/lib/components/types"
import { createUuid } from "@/lib/utils"
import { backgroundColorOptions, headingColorOptions, textColorOptions } from "@/lib/components/options"

import { RemoveComponentButton } from "../Dashboard/RemoveComponentButton/RemoveComponentButton"
import { FaqItem } from "./components/FaqItem"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const Faq: FunctionComponent<ComponentProps> = ({ form }) => {
    const { control } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: "faq.items",
    })

    const addFaqItem = () => {
        append({
            question: "",
            answer: "",
            id: createUuid(),
        })
    }

    return (
        <section className="mt-2 w-full rounded border border-neutral-100 px-6 py-4">
            <Accordion
                type="single"
                defaultValue="faq-component"
                collapsible
            >
                <AccordionItem value="faq-component">
                    <AccordionTrigger>
                        <h2 className="text-2xl">frequently asked questions</h2>
                    </AccordionTrigger>
                    <AccordionContent>
                        <FormField
                            control={form.control}
                            name="faq.title"
                            render={({ field }) => (
                                <FormItem className="my-4">
                                    <FormLabel>title</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="rounded shadow-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="faq.description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="rounded shadow-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="mt-8 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">items</h3>
                            <Button
                                className="shadow-none"
                                type="button"
                                onClick={addFaqItem}
                            >
                                add item
                            </Button>
                        </div>
                        {fields.map((item, itemIndex) => (
                            <FaqItem
                                key={item.id}
                                form={form}
                                itemIndex={itemIndex}
                                onRemove={() => remove(itemIndex)}
                            />
                        ))}
                        <h3 className="text-lg font-semibold mb-2 mt-6">style options</h3>
                        <FormField
                            control={form.control}
                            name="faq.backgroundColor"
                            render={({ field }) => (
                                <FormItem className="mb-4">
                                    <FormLabel>background color</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="select a background color" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {backgroundColorOptions.map((option, index) => (
                                                <SelectItem
                                                    key={`option-${index}`}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription className="!mt-0">
                                        you can set the value for these colors on the settings page
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="faq.headingColor"
                            render={({ field }) => (
                                <FormItem className="mb-4">
                                    <FormLabel>heading color</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="select a heading color" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {headingColorOptions.map((option, index) => (
                                                <SelectItem
                                                    key={`option-${index}`}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription className="!mt-0">
                                        you can set the value for these colors on the settings page
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="faq.textColor"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>text color</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="select a text color" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {textColorOptions.map((option, index) => (
                                                <SelectItem
                                                    key={`option-${index}`}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription className="!mt-0">
                                        you can set the value for these colors on the settings page
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="text-right">
                            <RemoveComponentButton component="faq" />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    )
}
