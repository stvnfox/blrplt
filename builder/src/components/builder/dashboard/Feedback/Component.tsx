"use client"

import { FunctionComponent, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useBuilderContext } from "@/providers/BuilderContextProvider"
import { createUuid } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const formSchema = z.object({
    howDidYouHear: z.string(),
    purposeOfUse: z.string(),
    recommend: z.boolean().default(true),
    difficultFeatures: z.string(),
    bugs: z.string(),
    futureWants: z.string(),
    otherSuggestions: z.string(),
    likeMost: z.string(),
    likeLeast: z.string(),
})

export const FeedbackComponent: FunctionComponent = () => {
    const { email } = useBuilderContext()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            howDidYouHear: "",
            purposeOfUse: "",
            recommend: true,
            difficultFeatures: "",
            bugs: "",
            futureWants: "",
            otherSuggestions: "",
            likeMost: "",
            likeLeast: "",
        },
    })

    const [isLoading, setIsLoading] = useState(false)
    const [isSucceeded, setIsSucceeded] = useState(false)
    const [hasError, setHasError] = useState(false)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)

        const data = {
            id: createUuid(),
            email: email,
            howDidYouHear: values.howDidYouHear,
            purposeOfUse: values.purposeOfUse,
            recommend: values.recommend,
            difficultFeatures: values.difficultFeatures,
            bugs: values.bugs,
            futureWants: values.futureWants,
            otherSuggestions: values.otherSuggestions,
            likeMost: values.likeMost,
            likeLeast: values.likeLeast
        }

        const response = await fetch("/api/builder/post-feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (response.status === 200) {
            setIsSucceeded(true)
            form.reset()
        } else {
            setHasError(true)
        }

        setIsLoading(false)
    }

    return (
        <section className="p-4 md:px-8">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-2 w-full space-y-4 rounded border border-neutral-100 px-6 py-4 lg:w-1/2"
                >
                    <h2 className="text-2xl">share your thoughts with us</h2>
                    <FormField
                        control={form.control}
                        name="recommend"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>would you recommend blrplt builder to anyone else?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue="yes"
                                        className="flex flex-row space-x-4"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="yes" />
                                            </FormControl>
                                            <FormLabel className="font-normal">yes</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="no" />
                                            </FormControl>
                                            <FormLabel className="font-normal">no</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bugs"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    did you encounter any bugs or issues? if so, please describe them.
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="likeMost"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>what did you like most about blrplt builder?</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="likeLeast"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>what did you like least about blrplt builder?</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="futureWants"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>what additional features would you like to see in the future?</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="otherSuggestions"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>do you have any other suggestions or comments to help us improve?</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading}>Submit</Button>
                    {isSucceeded && <p className="text-sm text-green-600">thank you so much for giving your feedback, we love you!</p>}
                    {hasError && <p className="text-sm text-red-500">error submitting your feedback. please try again later</p>}
                </form>
            </Form>
        </section>
    )
}
