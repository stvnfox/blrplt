import { FunctionComponent } from "react"

import { ComponentProps } from "@/lib/components/types"

import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export const FaqItem: FunctionComponent<
    ComponentProps & { itemIndex: number; onRemove: (index?: number | number[]) => void }
> = ({ itemIndex, form, onRemove }) => {
    return (
        <div
            key={`faq-item-${itemIndex}`}
            className="mt-6"
        >
            <div className="flex justify-between items-center">
                <Label
                    htmlFor={`faq-item-${itemIndex}`}
                    className="text-sm font-normal text-neutral-500"
                >
                    faq item {itemIndex + 1}
                </Label>
                <Button
                    className="shadow-none"
                    type="button"
                    variant="outline"
                    onClick={() => onRemove()}
                >
                    remove
                </Button>
            </div>
            <div
                id={`faq-item-${itemIndex}`}
                className="mt-4 space-y-4"
            >
                <FormField
                    control={form.control}
                    name={`faq.items.${itemIndex}.question`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>question</FormLabel>
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
                <FormField
                    key={`faq-item-${itemIndex}`}
                    control={form.control}
                    name={`faq.items.${itemIndex}.answer`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>answer</FormLabel>
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
    )
}
