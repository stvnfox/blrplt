import { FunctionComponent } from "react"
import { useFormContext } from "react-hook-form"

import { ComponentProps } from "@/lib/components/types"

import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export const UspsItemComponent: FunctionComponent<
    ComponentProps & {
        itemIndex: number
        keyDownEvent: (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => void
    }
> = ({ itemIndex, keyDownEvent }) => {
    const { control } = useFormContext()

    return (
        <>
            <AccordionTrigger className="text-sm font-normal">unique selling point {itemIndex + 1}</AccordionTrigger>
            <AccordionContent>
                <div
                    id={`usps-item-${itemIndex}`}
                    className="mt-4 space-y-4"
                >
                    <FormField
                        control={control}
                        name={`items.${itemIndex}.title`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>title</FormLabel>
                                <FormControl>
                                    <Input
                                        className="rounded shadow-none"
                                        {...field}
                                        onKeyDown={(e) => keyDownEvent(e)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        key={`usps-item-${itemIndex}`}
                        control={control}
                        name={`items.${itemIndex}.description`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="rounded shadow-none"
                                        {...field}
                                        onKeyDown={(e) => keyDownEvent(e)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </AccordionContent>
        </>
    )
}
