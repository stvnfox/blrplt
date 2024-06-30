import { signup } from "@/actions/auth"

export default function RegisterPage() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <form className="m-3 flex flex-col gap-4 rounded-md border p-6 w-96">
                <h1 className="text-2xl">blrplt builder</h1>
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
                    className="rounded border-2 border-black bg-black p-2 text-sm text-white transition-colors hover:bg-white hover:text-black focus:outline-black focus:outline-offset-2 focus:outline-dashed"
                    formAction={signup}
                >
                    Sign up
                </button>
                <a
                    className="mx-auto w-fit text-sm hover:underline focus:outline-black focus:outline-offset-2 focus:outline-dashed rounded p-1"
                    href="/login"
                >
                    Already have an account? Log in here!
                </a>
            </form>
        </main>
    )
}
