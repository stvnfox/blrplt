"use client"

import { FunctionComponent } from "react"

import { ComponentProps } from "@/lib/components/types"

import { RemoveComponentButton } from "../Dashboard/RemoveComponentButton/RemoveComponentButton"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { positionOptions } from "@/lib/components/options"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export const Content: FunctionComponent<ComponentProps> = ({ form }) => {
    return (
        <section className="mt-2 w-full rounded border border-neutral-100 px-6 py-4">
            <Accordion
                type="single"
                defaultValue="content-component"
                collapsible
            >
                <AccordionItem value="content-component">
                    <AccordionTrigger>
                        <h2 className="text-2xl">content</h2>
                    </AccordionTrigger>
                    <AccordionContent>
                        <FormField
                            control={form.control}
                            name="content.title"
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
                            name="content.description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>description (optional)</FormLabel>
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
                        <div className="mt-6">
                            <Label
                                htmlFor="content-image-block"
                                className="text-sm font-normal text-neutral-500"
                            >
                                image
                            </Label>
                            <div
                                id="content-image-block"
                                className="mt-2 space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="content.image.src"
                                    render={({ field }) => (
                                        <FormItem className="my-4">
                                            <FormLabel>image url</FormLabel>
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
                                    name="content.image.alt"
                                    render={({ field }) => (
                                        <FormItem className="my-4">
                                            <FormLabel>alt text</FormLabel>
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
                                    name="content.image.position"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>image position</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a position" />
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
                        </div>
                        <div className="mt-6">
                            <Label
                                htmlFor="content-cta-block"
                                className="text-sm font-normal text-neutral-500"
                            >
                                call to action (optional)
                            </Label>
                            <div
                                id="content-cta-block"
                                className="mt-2 space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="content.cta.label"
                                    render={({ field }) => (
                                        <FormItem className="my-4">
                                            <FormLabel>button label</FormLabel>
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
                                    name="content.cta.href"
                                    render={({ field }) => (
                                        <FormItem className="my-4">
                                            <FormLabel>button link</FormLabel>
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
                                    name="content.cta.ariaLabel"
                                    render={({ field }) => (
                                        <FormItem className="my-4">
                                            <FormLabel>aria label</FormLabel>
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
                            </div>
                        </div>
                        <div className="text-right">
                            <RemoveComponentButton component="content" />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    )
}
