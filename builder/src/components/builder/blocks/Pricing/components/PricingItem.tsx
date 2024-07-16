import { FunctionComponent } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"

import { ComponentProps } from "@/lib/components/types"
import { currencyOptions } from "@/lib/components/options"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export const PricingItemComponent: FunctionComponent<ComponentProps & { itemIndex: number; }> = ({ itemIndex, form }) => {
    const { control } = useFormContext()
    const {
        fields: includeFields,
        append: appendInclude,
        remove: removeInclude,
    } = useFieldArray({
        control,
        name: `pricing.items.${itemIndex}.includes`,
    })

    return (
        <div className="mt-6">
            <Label
                htmlFor={`pricing-item-block-${itemIndex}`}
                className="text-sm font-normal text-neutral-500"
            >
                pricing item {itemIndex + 1}
            </Label>
            <div
                id={`pricing-item-block-${itemIndex}`}
                className="mt-4 space-y-4"
            >
                <FormField
                    control={form.control}
                    name={`pricing.items.${itemIndex}.title`}
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
                    control={form.control}
                    name={`pricing.items.${itemIndex}.description`}
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
                <FormField
                    control={form.control}
                    name={`pricing.items.${itemIndex}.price`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>price</FormLabel>
                            <FormControl>
                                <Input
                                    className="rounded shadow-none"
                                    type="number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`pricing.items.${itemIndex}.currency`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>currency</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a component" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {currencyOptions.map((option, index) => (
                                        <SelectItem
                                            key={`option-${index}`}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div
                    key={`pricing-item-includes-item-${itemIndex}`}
                    className="mt-6"
                >
                    <Label
                        htmlFor="pricing-item-includes-block-item"
                        className="text-sm font-normal text-neutral-500"
                    >
                        pricing item includes:
                    </Label>
                    <div
                        id="pricing-item-includes-block-item"
                        className="mt-2 space-y-4"
                    >
                        {includeFields.map((includeItem, includeIndex) => (
                            <div
                                key={includeItem.id}
                                id={`pricing-item-includes-block-item-${includeIndex}`}
                                className="mt-2 space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name={`pricing.items.${itemIndex}.includes[${includeIndex}]`}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <Input
                                                    className="rounded shadow-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <Button
                                                className="shadow-none"
                                                type="button"
                                                onClick={() => removeInclude(includeIndex)}
                                            >
                                                remove
                                            </Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ))}
                        {includeFields.length === 0 && (
                            <div className="text-sm italic">
                                no includes added. add one by clicking the button below.
                            </div>
                        )}
                        <Button
                            className="mt-2 shadow-none"
                            type="button"
                            onClick={() => appendInclude('')}
                        >
                            add more
                        </Button>
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name={`pricing.items.${itemIndex}.mostPopular`}
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">most popular choice</FormLabel>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}