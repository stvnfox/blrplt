import { FunctionComponent } from "react"
import { useFormContext, useFieldArray } from "react-hook-form"

import { ComponentProps } from "@/lib/components/types"

import { RemoveComponentButton } from "../Dashboard/RemoveComponentButton/RemoveComponentButton"
import { PricingItemComponent } from "./components/PricingItem"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export const Pricing: FunctionComponent<ComponentProps> = ({ form }) => {
    const { control } = useFormContext()
    const { fields: pricingFields, append: appendPricingItem } = useFieldArray({
        control,
        name: "pricing.items",
    })

    const addPricingItem = () => {
        appendPricingItem({
            title: "",
            description: "",
            price: undefined,
            currency: "EUR",
            includes: [],
            mostPopular: false,
        })
    }

    return (
        <section className="mt-2 w-full rounded border border-neutral-100 px-6 py-4">
            <Accordion
                type="single"
                defaultValue="pricing-component"
                collapsible
            >
                <AccordionItem value="pricing-component">
                    <AccordionTrigger>
                        <h2 className="text-2xl">pricing</h2>
                    </AccordionTrigger>
                    <AccordionContent>
                        <FormField
                            control={form.control}
                            name="pricing.title"
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
                            name="pricing.description"
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
                            <h3 className="text-lg font-semibold">pricing items</h3>
                            {pricingFields.length < 3 && (
                                <Button
                                    className="shadow-none"
                                    type="button"
                                    onClick={addPricingItem}
                                >
                                    add pricing item
                                </Button>
                            )}
                        </div>
                        {pricingFields.map((item, itemIndex) => (
                            <PricingItemComponent
                                key={item.id}
                                itemIndex={itemIndex}
                                form={form}
                            />
                        ))}
                        <div className="text-right">
                            <RemoveComponentButton component="pricing" />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    )
}
