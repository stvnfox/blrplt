"use client"

import { useState } from "react"
import { HandMetal } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { resetPassword } from "@/actions/auth"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
    email: z.string().email(),
})

export default function RegisterPage() {
    const [showMessage, setShowMessage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)

        const response = await resetPassword(values.email)

        if (response.message === "succeeded") {
            setShowMessage(true)
        }

        setIsLoading(false)
    }

    return (
        <main className="flex min-h-screen items-center justify-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="m-3 flex w-96 flex-col gap-4 rounded-md border p-6"
                >
                    <div className="mr-6 flex items-center gap-2 text-2xl font-semibold">
                        <HandMetal className="h-6 w-6" />
                        <h1>blrplt builder</h1>
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-normal">email</FormLabel>
                                <FormControl>
                                    <Input className="focus-visible:ring-2 !mt-1" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {showMessage && (
                        <p className="text-sm font-semibold">please check your email for further instructions</p>
                    )}
                    <Button
                        type="submit"
                        disabled={isLoading}
                    >
                        reset password
                    </Button>
                    <a
                        className="mx-auto w-fit rounded p-1 text-sm hover:underline focus:outline-dashed focus:outline-offset-2 focus:outline-black"
                        href="/login"
                    >
                        no need for a reset? log in here!
                    </a>
                </form>
            </Form>
        </main>
    )
}
