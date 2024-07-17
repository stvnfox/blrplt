import { FunctionComponent, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useBuilderContext } from "@/providers/BuilderContextProvider"
import { createDefaultFormValues } from "@/lib/components/defaultValues"
import { ComponentDefaultValues, ComponentKey } from "@/lib/components/types"
import { createCombinedSchema } from "@/lib/form/schema"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { ComponentSwitcher } from "@/components/builder/blocks/Dashboard/ComponentMapper/components/ComponentSwitcher"

export type BuilderComponent = {
    order: number
    type: ComponentKey
    data: any
}

type ComponentMapperProps = {
    components: BuilderComponent[]
    slug: string
}

export const ComponentMapper: FunctionComponent<ComponentMapperProps> = ({ components, slug }) => {
    const { sites } = useBuilderContext()

    const [isLoading, setIsLoading] = useState(false)
    const [isSucceeded, setIsSucceeded] = useState(false)
    const [hasError, setHasError] = useState(false)

    const formSchema = createCombinedSchema(components.map((component) => component.type))

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: createDefaultFormValues(
            components.map((component) => component.type),
            components.reduce((acc, component) => {
                acc[component.type] = component.data
                return acc
            }, {} as Partial<ComponentDefaultValues>)
        ),
    })

    const createComponentData = (values: z.infer<typeof formSchema>, components: BuilderComponent[]) => {
        return components.map((component) => {
            const componentData = values[component.type]

            return {
                order: component.order,
                type: component.type,
                data: componentData,
            }
        })
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        setHasError(false)

        const data = {
            siteId: sites[0].id,
            pages: sites[0].pages,
            page: slug.toLowerCase(),
            components: createComponentData(values, components),
        }

        const response = await fetch("/api/builder/update-page", {
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
                {components.map((component, index) => {
                    return (
                        <ComponentSwitcher
                            key={`component-${component.type}-${index}`}
                            component={component}
                            slug={slug}
                            form={form}
                        />
                    )
                })}
                <div className="sticky bottom-0 flex justify-end px-8 py-4 border-t border-neutral-100 bg-white/80">
                    <Button
                        className="ml-auto"
                        type="submit"
                        disabled={isLoading}
                    >
                        save changes
                    </Button>
                    {hasError && <p className="text-sm">error updating site</p>}
                    {isSucceeded && <p className="text-sm">site updated!</p>}
                </div>
            </form>
        </Form>
    )
}
