import { NavigationComponent } from "@/components/builder/layout/NavigationComponent/NavigationComponent";
import Link from "next/link";
import { HandMetal, ThumbsDown } from "lucide-react";

export default function ErrorPage() {
    return (
        <>
        <header className="bg-white sticky top-0 flex h-16 items-center justify-between gap-4 border-b px-4 md:px-6 z-50">
            <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base mr-6">
                    <HandMetal className="h-6 w-6" />
                    <span>blrplt builder</span>
                </Link>
            </nav>
        </header>
            <section className="flex flex-col gap-6 w-full items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
                <h1 className="flex items-center gap-4 text-4xl lg:text-6xl">
                    <ThumbsDown className="h-10 w-10 lg:h-16 lg:w-16" />
                    meh, that sucks
                </h1>
                <p>
                    something went wrong, please try again later
                </p>
            </section>
        </>
    )
}
