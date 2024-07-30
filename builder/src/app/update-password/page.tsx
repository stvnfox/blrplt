"use client"

import { useEffect, useState } from "react"
import { HandMetal } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { updatePassword } from "@/actions/auth"
import { createClient } from "@/lib/supabase/client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z
    .object({
        password: z.string().min(6),
        confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

export default function RegisterPage() {
    const [isSucceeded, setIsSucceeded] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isExpired, setIsExpired] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)

        const response = await updatePassword(values.password)

        if (response.status === "success") {
            setIsSucceeded(true)
            form.reset()
        }

        if (response.status === "failed") {
            setHasError(true)
        }

        setMessage(response.message)
        setIsLoading(false)
    }

    useEffect(() => {
        const supabase = createClient()

        supabase.auth.onAuthStateChange((event, session) => {
            if (event === "INITIAL_SESSION" && !session) {
                setIsExpired(true)
            }
        })
    }, [])

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
                    {!isExpired ? (
                        <>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="-mt-1">
                                        <FormLabel className="text-sm font-normal">new password</FormLabel>
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
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-normal">confirm new password</FormLabel>
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
                            {hasError && <p className="text-sm text-red-500">{message}</p>}
                            {isSucceeded ? (
                                <>
                                    <p className="text-sm text-green-500">{message}</p>
                                    <a
                                        className="h-10 text-center rounded border-2 border-black bg-black p-2 text-sm font-normal text-white shadow-none transition-colors hover:bg-white hover:text-black focus:outline-dashed focus:outline-offset-2 focus:outline-black"
                                        href="/login"
                                    >
                                        log in here!
                                    </a>
                                </>
                            ) : (
                                <>
                                    <Button
                                        type="submit"
                                        className="h-10 rounded border-2 border-black bg-black p-2 text-sm font-normal text-white shadow-none transition-colors hover:bg-white hover:text-black focus:outline-dashed focus:outline-offset-2 focus:outline-black"
                                        disabled={isLoading}
                                    >
                                        save new password
                                    </Button>
                                    <a
                                        className="mx-auto w-fit rounded p-1 text-sm hover:underline focus:outline-dashed focus:outline-offset-2 focus:outline-black"
                                        href="/login"
                                    >
                                        no need for a reset? log in here!
                                    </a>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <p className="text-sm">
                                meh, this link has expired. please request a new one by clicking below
                            </p>
                            <a
                                className="h-10 rounded border-2 border-black bg-black p-2 text-center text-sm font-normal text-white shadow-none transition-colors hover:bg-white hover:text-black focus:outline-dashed focus:outline-offset-2 focus:outline-black"
                                href="/forgot-password"
                            >
                                reset password
                            </a>
                        </>
                    )}
                </form>
            </Form>
        </main>
    )
}
