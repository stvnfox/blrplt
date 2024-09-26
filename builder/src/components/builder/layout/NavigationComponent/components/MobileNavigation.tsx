import { FunctionComponent, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HandMetal, Megaphone, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { useBuilderContext } from "@/providers/BuilderContextProvider"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

export const MobileNavigation: FunctionComponent = () => {
    const pathname = usePathname()
    const { sites } = useBuilderContext()

    const [open, setOpen] = useState(false)

    return (
        <Sheet
            open={open}
            onOpenChange={setOpen}
        >
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription className="sr-only">This is the navigation menu for blrplt builder</SheetDescription>
                <nav className="grid gap-6 text-lg font-medium">
                    <div className="flex items-center gap-2 text-lg font-semibold md:text-base">
                        <HandMetal className="h-6 w-6" />
                        <span>blrplt builder</span>
                    </div>
                    <Link
                        href="/"
                        className={cn(pathname === "/" && "underline underline-offset-2")}
                        onClick={() => setOpen(false)}
                    >
                        dashboard
                    </Link>
                    {sites[0] && (
                        <Link
                            href="/settings"
                            className={cn(pathname === "/settings" && "underline underline-offset-2")}
                            onClick={() => setOpen(false)}
                        >
                            settings
                        </Link>
                    )}
                    <Link
                        href="/feedback"
                        className={cn(
                            "flex items-center gap-1",
                            pathname === "/feedback" && "underline underline-offset-2"
                        )}
                        onClick={() => setOpen(false)}
                    >
                        feedback
                        <Megaphone className="h-5 w-5" />
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    )
}
