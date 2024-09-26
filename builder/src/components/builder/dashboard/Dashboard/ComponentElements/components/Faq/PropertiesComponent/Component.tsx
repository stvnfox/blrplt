import { FunctionComponent, useEffect } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PlusIcon } from "lucide-react"

import { ComponentElementInstance } from "@/components/builder/dashboard/Dashboard/ComponentElements/Component"
import { componentSchemas } from "@/lib/components/componentSchemas"
import { componentDefaultValues } from "@/lib/components/defaultValues"
import { useDesigner } from "@/lib/hooks/useDesigner"
import { createUuid } from "@/lib/utils"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FaqItemComponent } from "./components/FaqItem"
import { Accordion, AccordionItem } from "@/components/ui/accordion"

const formSchema = componentSchemas.faq

type FaqPropertiesComponentProps = {
    instance: ComponentElementInstance
}

export const PropertiesComponent: FunctionComponent<FaqPropertiesComponentProps> = ({ instance }) => {
    const { updateComponent } = useDesigner()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
            title: instance.extraAttributes?.title ?? componentDefaultValues.faq.title,
            description: instance.extraAttributes?.description ?? componentDefaultValues.faq.description,
            items: instance.extraAttributes?.items ?? componentDefaultValues.faq.items,
        },
    })

    const faqItems = form.watch("items")
    const addFaqItem = () => {
        form.setValue("items", [
            ...faqItems,
            {
                question: componentDefaultValues.faq.items[0].question,
                answer: componentDefaultValues.faq.items[0].answer,
                id: createUuid(),
            },
        ])

        handleChanges(form.getValues())
    }

    const removeItem = (index: number) => {
        form.setValue(
            "items",
            faqItems.filter((_, i) => i !== index)
        )

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
                <h3 className="mt-8 text-sm font-semibold">frequently asked question items</h3>
                <Accordion
                    type="single"
                    collapsible
                    className="flex flex-col gap-2"
                >
                    {faqItems.map((_, itemIndex) => (
                        <AccordionItem
                            key={`faq-component-${itemIndex}`}
                            value={`faq-component-${itemIndex}`}
                        >
                            <FaqItemComponent
                                itemIndex={itemIndex}
                                form={form}
                                onRemove={() => removeItem(itemIndex)}
                                keyDownEvent={(e) => handleChangeOnEnter(e)}
                            />
                        </AccordionItem>
                    ))}
                </Accordion>
                <Button
                    className="gap-2 shadow-none"
                    variant="outline"
                    type="button"
                    onClick={addFaqItem}
                >
                    <PlusIcon size={16} /> add faq item
                </Button>
            </form>
        </Form>
    )
}
