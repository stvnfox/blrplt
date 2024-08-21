"use client"

import { useState } from "react"
import { HandMetal } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Status, StatusType } from "@/lib/types"

const formSchema = z.object({
    email: z.string().email(),
})

export default function ForgotPasswordPage() {
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState<StatusType>(Status.Idle)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setStatus(Status.Loading)
        setMessage("")

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
        const data = await response.json()

        if (data.status !== 201) {
            setStatus(Status.Error)
            setMessage(data.message)
            return
        }

        setStatus("success")
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
                    {status === Status.Success && (
                        <p className="text-sm font-semibold">please check your email for further instructions</p>
                    )}
                    {status === Status.Error && (
                        <p className="text-sm font-semibold text-red-600">{message}</p>
                    )}
                    <Button
                        type="submit"
                        disabled={status === Status.Loading}
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
