"use client"

import { FunctionComponent } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { CircleUser } from "lucide-react"

import { createClient } from "@/lib/supabase/client"
import { useBuilderContext } from "@/providers/BuilderContextProvider"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export const AccountMenu: FunctionComponent = () => {
    const { siteName } = useBuilderContext()
    const supabase = createClient()
    const router = useRouter()
    const pathname = usePathname()

    const logout = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
            router.push("/error")
        }

        router.push("/login")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full border border-neutral-100 shadow-none transition-colors hover:border-neutral-200"
                >
                    <CircleUser size={20} />
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-64"
                align="end"
            >
                <DropdownMenuLabel>{siteName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link
                        className={cn("hover:cursor-pointer", pathname === "/" && "bg-neutral-100 font-semibold")}
                        href="/"
                    >
                        dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link
                        className={cn(
                            "hover:cursor-pointer",
                            pathname === "/settings" && "bg-neutral-100 font-semibold"
                        )}
                        href="/settings"
                    >
                        settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link
                        className={cn(
                            "hover:cursor-pointer",
                            pathname === "/feedback" && "bg-neutral-100 font-semibold"
                        )}
                        href="/feedback"
                    >
                        feedback
                    </Link>
                </DropdownMenuItem>
                {/* <Link
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
                </Link> */}
                <DropdownMenuItem disabled>support (soon)</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="!hover:bg-transparant">
                    <Button
                        className="w-full cursor-pointer"
                        onClick={logout}
                    >
                        logout
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
