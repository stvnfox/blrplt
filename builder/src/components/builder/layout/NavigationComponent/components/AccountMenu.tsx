"use client"

import { FunctionComponent } from "react"
import { revalidatePath } from "next/cache"
import { useRouter } from "next/navigation"
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
    const siteName = sites[0].name

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
            <DropdownMenuContent className="w-64" align="end">
                <DropdownMenuLabel>{siteName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>settings (soon)</DropdownMenuItem>
                <DropdownMenuItem disabled>support (soon)</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Button onClick={logout}>
                        logout
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
