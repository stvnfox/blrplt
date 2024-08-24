"use client"

import { useState } from "react"
import { HandMetal } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { StatusType, Status } from "@/lib/types"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export default function RegisterPage() {
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState<StatusType>(Status.Idle)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setStatus(Status.Loading)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })

        if(!response.ok) {
            switch(response.status) {
                case 409:
                    setStatus(Status.Error)
                    setMessage("email already exists")
                    break
                default:
                    setStatus(Status.Error)
                    setMessage("something went wrong, please try again")
            }
            return
        }

        setMessage("your account has been created, please check your email to verify your account")
        setStatus(Status.Success)
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
                            <FormItem className="-mt-1">
                                <FormLabel className="text-sm font-normal">email</FormLabel>
                                <FormControl>
                                    <Input
                                        className="!mt-1 focus-visible:ring-2"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel className="text-sm font-normal">password</FormLabel>
                                </div>
                                <FormControl>
                                    <Input
                                        type="password"
                                        className="!mt-1 focus-visible:ring-2"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {status === Status.Error && <p className="text-sm text-red-500">{message}</p>}
                    {status === Status.Success ? (
                        <>
                            <p className="text-sm text-green-500">{message}</p>
                            <a
                                className="mx-auto w-fit rounded p-1 text-sm hover:underline focus:outline-dashed focus:outline-offset-2 focus:outline-black"
                                href="/login"
                            >
                                checked your email? log in here!
                            </a>
                        </>
                    ) : (
                        <>
                            <Button
                                type="submit"
                                className="h-10 rounded border-2 border-black bg-black p-2 text-sm font-normal text-white shadow-none transition-colors hover:bg-white hover:text-black focus:outline-dashed focus:outline-offset-2 focus:outline-black"
                                disabled={status === Status.Loading}
                            >
                                sign up
                            </Button>
                            <a
                                className="mx-auto w-fit rounded p-1 text-sm hover:underline focus:outline-dashed focus:outline-offset-2 focus:outline-black"
                                href="/login"
                            >
                                already have an account? log in here!
                            </a>
                        </>
                    )}
                </form>
            </Form>
        </main>
    )
}
