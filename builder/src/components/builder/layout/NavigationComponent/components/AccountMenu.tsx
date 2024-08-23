"use client"

import { FunctionComponent } from "react"
import { useRouter } from "next/navigation"
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

export const AccountMenu: FunctionComponent = () => {
    const { sites } = useBuilderContext()
    const supabase = createClient()
    const router = useRouter()
    const siteName = sites[0] ? sites[0].name : "blrplt builder"

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
                    className="rounded-full"
                >
                    <CircleUser className="h-5 w-5" />
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
                        className="hover:cursor-pointer"
                        href="/settings"
                    >
                        settings
                    </Link>
                </DropdownMenuItem>
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
