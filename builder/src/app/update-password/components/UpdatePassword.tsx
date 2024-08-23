"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { HandMetal } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { createClient } from "@/lib/supabase/client"
import { StatusType, Status } from "@/lib/types"

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

export default function UpdatePasswordComponent() {
    const [status, setStatus] = useState<StatusType>(Status.Idle)
    const [message, setMessage] = useState("")
    const [isExpired, setIsExpired] = useState(false)

    const params = useSearchParams()
    const code = params.get("code") ?? ""
    const [tokens, setTokens] = useState({ access_token: "", refresh_token: "" })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setStatus(Status.Loading)
        setMessage("")

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/update-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokens.access_token}`,
            },
            body: JSON.stringify({
                password: values.password,
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
            }),
        })
        const data = await response.json()

        if (data.status !== 201) {
            setStatus(Status.Error)
            setMessage(data.message)
            return
        }

        setStatus(Status.Success)
        setMessage(data.message)
    }

    const verifyToken = async () => {
        const supabase = createClient()

        const { data, error } = await supabase.auth.verifyOtp({
            token_hash: code,
            type: "email",
        })

        if (data.session) {
            supabase.auth.onAuthStateChange((event, session) => {
                if (event === "SIGNED_IN" && session) {
                    setTokens({
                        access_token: session.access_token,
                        refresh_token: session.refresh_token,
                    })
                }

                if (event === "INITIAL_SESSION" && !session) {
                    setIsExpired(true)
                }
            })
        }
    }

    useEffect(() => {
        if (code) {
            verifyToken()
        }
    }, [code])

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
                            {status === Status.Error && <p className="text-sm text-red-500">{message}</p>}
                            {status === Status.Success ? (
                                <>
                                    <p className="text-sm text-green-500">{message}</p>
                                    <a
                                        className="h-10 rounded border-2 border-black bg-black p-2 text-center text-sm font-normal text-white shadow-none transition-colors hover:bg-white hover:text-black focus:outline-dashed focus:outline-offset-2 focus:outline-black"
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
                                        disabled={status === Status.Loading}
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
