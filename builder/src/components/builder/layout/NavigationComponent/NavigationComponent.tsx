"use client"

import { FunctionComponent } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HandMetal, Megaphone } from "lucide-react"

import { useBuilderContext } from "@/providers/BuilderContextProvider"
import { cn } from "@/lib/utils"

import { AccountMenu } from "./components/AccountMenu"
import { MobileNavigation } from "./components/MobileNavigation"
import { Button } from "@/components/ui/button"

export const NavigationComponent: FunctionComponent = () => {
    const { sites } = useBuilderContext()
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-4 border-b bg-white px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <div className="mr-6 flex items-center gap-2 text-lg font-semibold md:text-base">
                    <HandMetal className="h-6 w-6" />
                    <span>blrplt builder</span>
                </div>
                <Link
                    href="/"
                    className={cn(pathname === "/" && "underline underline-offset-2")}
                >
                    dashboard
                </Link>
                <Link
                    href="/settings"
                    className={cn(pathname === "/settings" && "underline underline-offset-2")}
                >
                    settings
                </Link>
                <Link
                    href="/feedback"
                    className={cn("flex items-center gap-1", pathname === "/feedback" && "underline underline-offset-2")}
                >
                    feedback
                    <Megaphone className="h-5 w-5" />
                </Link>
            </nav>
            <MobileNavigation />
            <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                {sites[0] && (
                    <Button
                        asChild
                        variant="outline"
                        className="shadow-none"
                    >
                        <a
                            target="_blank"
                            href={`/preview/${sites[0].url}`}
                        >
                            preview
                        </a>
                    </Button>
                )}
                <AccountMenu />
            </div>
        </header>
    )
}
