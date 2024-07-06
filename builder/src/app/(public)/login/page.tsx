import { HandMetal } from "lucide-react"

import { login } from "@/actions/auth"

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <form className="m-3 flex flex-col gap-4 rounded-md border p-6 w-96">
                <div className="flex items-center gap-2 font-semibold text-2xl mr-6">
                    <HandMetal className="h-6 w-6" />
                    <h1>blrplt builder</h1>
                </div>
                <div className="flex flex-col">
                    <label
                        htmlFor="email"
                        className="text-sm"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="rounded border p-2 transition-colors hover:border-neutral-600 focus:outline-black"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label
                        htmlFor="password"
                        className="text-sm"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="rounded border p-2 transition-colors hover:border-neutral-600 focus:outline-black"
                        required
                    />
                </div>
                <button
                    className="rounded border-2 border-black bg-black p-2 text-sm text-white transition-colors hover:bg-white hover:text-black focus:outline-dashed focus:outline-offset-2 focus:outline-black"
                    formAction={login}
                >
                    Log in
                </button>
                <a
                    className="mx-auto w-fit rounded p-1 text-sm hover:underline focus:outline-dashed focus:outline-offset-2 focus:outline-black"
                    href="/register"
                >
                    Sign up
                </a>
            </form>
        </main>
    )
}
