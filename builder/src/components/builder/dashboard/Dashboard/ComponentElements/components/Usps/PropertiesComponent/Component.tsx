import { FunctionComponent, useEffect } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PlusIcon } from "lucide-react"

import { ComponentElementInstance } from "@/components/builder/dashboard/Dashboard/ComponentElements/Component"
import { componentSchemas } from "@/lib/components/componentSchemas"
import { componentDefaultValues } from "@/lib/components/defaultValues"
import { useDesigner } from "@/lib/hooks/useDesigner"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem } from "@/components/ui/accordion"
import { UspsItemComponent } from "./components/UspsItem"

const formSchema = componentSchemas.usps

type UspsPropertiesComponentProps = {
    instance: ComponentElementInstance
}

export const PropertiesComponent: FunctionComponent<UspsPropertiesComponentProps> = ({ instance }) => {
    const { updateComponent } = useDesigner()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
            title: instance.extraAttributes?.title ?? componentDefaultValues.usps.title,
            description: instance.extraAttributes?.description ?? componentDefaultValues.usps.description,
            items: instance.extraAttributes?.items ?? componentDefaultValues.usps.items,
        },
    })

    const uspItems = form.watch("items")
    const addUspItem = () => {
        form.setValue("items", [
            ...uspItems,
            {
                title: componentDefaultValues.usps.items[0].title,
                description: componentDefaultValues.usps.items[0].description,
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
            title: instance.extraAttributes?.title ?? componentDefaultValues.usps.title,
            description: instance.extraAttributes?.description ?? componentDefaultValues.usps.description,
            items: instance.extraAttributes?.items ?? componentDefaultValues.usps.items,
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
                <h3 className="mt-8 text-sm font-semibold">unique selling point items</h3>
                <Accordion
                    type="single"
                    collapsible
                    className="flex flex-col gap-2"
                >
                    {uspItems.map((_, itemIndex) => (
                        <AccordionItem
                            key={`pricing-component-${itemIndex}`}
                            value={`pricing-component-${itemIndex}`}
                        >
                            <UspsItemComponent
                                itemIndex={itemIndex}
                                keyDownEvent={(e) => handleChangeOnEnter(e)}
                            />
                        </AccordionItem>
                    ))}
                </Accordion>
                {uspItems.length < 3 && (
                    <Button
                        className="gap-2 shadow-none"
                        variant="outline"
                        type="button"
                        onClick={addUspItem}
                    >
                        <PlusIcon size={16} /> add unique selling point item
                    </Button>
                )}
            </form>
        </Form>
    )
}
