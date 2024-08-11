"use client"

import { FunctionComponent } from "react"

import { ComponentProps } from "@/lib/components/types"
import { backgroundColorOptions, headingColorOptions, textColorOptions } from "@/lib/components/options"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export const Header: FunctionComponent<ComponentProps> = ({ form }) => {
    return (
        <section className="mt-2 w-full rounded border border-neutral-100 px-6 py-4">
            <Accordion
                type="single"
                defaultValue="header-component"
                collapsible
            >
                <AccordionItem value="header-component">
                    <AccordionTrigger>
                        <h2 className="text-2xl">header</h2>
                    </AccordionTrigger>
                    <AccordionContent>
                        <FormField
                            control={form.control}
                            name="header.title"
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
                            name="header.subtitle"
                            render={({ field }) => (
                                <FormItem className="mb-4">
                                    <FormLabel>subtitle</FormLabel>
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
                            name="header.description"
                            render={({ field }) => (
                                <FormItem className="mb-4">
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
                        <FormField
                            control={form.control}
                            name="header.backgroundColor"
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
                            name="header.headingColor"
                            render={({ field }) => (
                                <FormItem className="mb-4">
                                    <FormLabel>heading color</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="select a header color" />
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
                            name="header.textColor"
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
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    )
}
