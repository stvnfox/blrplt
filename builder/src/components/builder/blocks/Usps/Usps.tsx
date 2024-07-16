"use client"

import { FunctionComponent, useState } from "react"

import { UspItem, ComponentProps } from "@/lib/components/types"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RemoveComponentButton } from "../Dashboard/RemoveComponentButton/RemoveComponentButton"

export const Usps: FunctionComponent<ComponentProps> = ({ form }) => {
    const [uspsAmount, setUspsAmount] = useState<number>(form.watch("usps.items.length") ?? 1)
    const [usps, setUsps] = useState<UspItem[]>(form.getValues("usps.items"))

    const addUsp = () => {
        setUspsAmount(uspsAmount + 1)
        setUsps([...usps, { title: "", description: "" }])

        form.setValue(`usps.items[${uspsAmount}]`, { title: "", description: "" })
    }

    return (
        <section className="mt-2 w-full rounded border border-neutral-100 px-6 py-4">
            <Accordion
                type="single"
                defaultValue="usps-component"
                collapsible
            >
                <AccordionItem value="usps-component">
                    <AccordionTrigger>
                        <h2 className="text-2xl">unique selling points</h2>
                    </AccordionTrigger>
                    <AccordionContent>
                        <FormField
                            control={form.control}
                            name="usps.title"
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
                        <div className="mt-8 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">usp items</h3>
                            {uspsAmount < 3 && (
                                <Button
                                    className="shadow-none"
                                    type="button"
                                    onClick={addUsp}
                                >
                                    add usp
                                </Button>
                            )}
                        </div>
                        {usps.map((item, index) => (
                            <div
                                key={`usps-item-${index}`}
                                className="mt-6"
                            >
                                <Label
                                    htmlFor={`usps-item-${index}`}
                                    className="text-sm font-normal text-neutral-500"
                                >
                                    usp {index + 1}
                                </Label>
                                <div
                                    id={`usps-item-${index}`}
                                    className="mt-4 space-y-4"
                                >
                                    <FormField
                                        control={form.control}
                                        name={`usps.items.${index}.title`}
                                        render={({ field }) => (
                                            <FormItem>
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
                                        key={`usps-item-${index}`}
                                        control={form.control}
                                        name={`usps.items.${index}.description`}
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
                                </div>
                            </div>
                        ))}
                        <div className="text-right">
                            <RemoveComponentButton component="usps" />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    )
}
