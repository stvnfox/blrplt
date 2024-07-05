"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const Header = ({ form }: { form: any }) => {
    return (
        <section className="mt-2 w-full rounded border border-neutral-100 px-6 py-4">
            <Accordion
                type="single"
                defaultValue="header-component"
                collapsible
            >
                <AccordionItem value="header-component">
                    <AccordionTrigger>
                        <h2 className="text-2xl">Header</h2>
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
                                <FormItem>
                                    <FormLabel>description</FormLabel>
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
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    )
}
