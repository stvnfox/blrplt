import { FunctionComponent } from "react"
import { useFormContext } from "react-hook-form"
import { XIcon } from "lucide-react"

import { ComponentProps } from "@/lib/components/types"

import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export const FaqItemComponent: FunctionComponent<
    ComponentProps & {
        itemIndex: number
        onRemove: (index?: number | number[]) => void
        keyDownEvent: (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => void
    }
> = ({ itemIndex, onRemove, keyDownEvent }) => {
    const { control } = useFormContext()

    return (
        <>
            <AccordionTrigger>
                <Label
                    htmlFor={`pricing-item-block-${itemIndex}`}
                    className="text-sm font-normal"
                >
                    frequently asked question item {itemIndex + 1}
                </Label>
            </AccordionTrigger>
            <AccordionContent>
                <div
                    id={`faq-item-${itemIndex}`}
                    className="mt-4 space-y-4"
                >
                    <FormField
                        control={control}
                        name={`items.${itemIndex}.question`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>question</FormLabel>
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
                    <FormField
                        key={`faq-item-${itemIndex}`}
                        control={control}
                        name={`items.${itemIndex}.answer`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>answer</FormLabel>
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
                <div className="text-end">
                    <Button
                        className="mt-2 gap-2 shadow-none"
                        type="button"
                        variant="destructive"
                        onClick={() => onRemove(itemIndex)}
                    >
                        <XIcon size={16} />
                        remove item
                    </Button>
                </div>
            </AccordionContent>
        </>
    )
}
