import { FunctionComponent, useEffect } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { ComponentElementInstance } from "../../../ComponentElements/Component"
import { componentSchemas } from "@/lib/components/componentSchemas"
import { componentDefaultValues } from "@/lib/components/defaultValues"
import { useDesigner } from "@/lib/hooks/useDesigner"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { PricingItemComponent } from "./components/PricingItem"
import { Accordion, AccordionItem } from "@/components/ui/accordion"

const formSchema = componentSchemas.pricing

type PricingPropertiesComponentProps = {
    instance: ComponentElementInstance
}

export const PropertiesComponent: FunctionComponent<PricingPropertiesComponentProps> = ({ instance }) => {
    const { updateComponent } = useDesigner()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
            title: instance.extraAttributes?.title ?? componentDefaultValues.pricing.title,
            description: instance.extraAttributes?.description ?? componentDefaultValues.pricing.description,
            items: instance.extraAttributes?.items ?? componentDefaultValues.pricing.items,
        },
    })

    const pricingItems = form.watch("items")
    const addPricingItem = () => {
        form.setValue("items", [
            ...pricingItems,
            {
                title: "",
                description: "",
                price: undefined,
                currency: "EUR",
                includes: [],
                mostPopular: false,
            },
        ])

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
                items: values.items,
            },
        })
    }

    useEffect(() => {
        form.reset({
            title: instance.extraAttributes?.title ?? componentDefaultValues.pricing.title,
            description: instance.extraAttributes?.description ?? componentDefaultValues.pricing.description,
            items: instance.extraAttributes?.items ?? componentDefaultValues.pricing.items,
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
                <h3 className="mt-8 text-sm font-semibold">pricing items</h3>
                <Accordion
                    type="single"
                    collapsible
                    className="flex flex-col gap-2"
                >
                    {pricingItems.map((item, itemIndex) => (
                        <AccordionItem
                            key={`pricing-component-${itemIndex}`}
                            value={`pricing-component-${itemIndex}`}
                        >
                            <PricingItemComponent
                                key={`${item}-${itemIndex}`}
                                itemIndex={itemIndex}
                                form={form}
                                keyDownEvent={(e) => handleChangeOnEnter(e)}
                            />
                        </AccordionItem>
                    ))}
                </Accordion>
                {pricingItems.length < 3 && (
                    <Button
                        className="gap-2 shadow-none"
                        variant="outline"
                        type="button"
                        onClick={addPricingItem}
                    >
                        <PlusIcon size={16} /> add pricing item
                    </Button>
                )}
            </form>
        </Form>
    )
}
