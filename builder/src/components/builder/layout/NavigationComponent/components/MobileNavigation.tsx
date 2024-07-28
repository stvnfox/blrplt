import { FunctionComponent } from "react"
import Link from "next/link"
import { HandMetal, Megaphone, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export const MobileNavigation: FunctionComponent = () => {
    return (
        <Sheet>
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
                <nav className="grid gap-6 text-lg font-medium">
                    <div className="flex items-center gap-2 text-lg font-semibold md:text-base">
                        <HandMetal className="h-6 w-6" />
                        <span>blrplt builder</span>
                    </div>
                    <Link
                        href="/"
                        className="hover:text-foreground"
                    >
                        dashboard
                    </Link>
                    <Link
                        href="/feedback"
                        className="flex items-center gap-1"
                    >
                        feedback
                        <Megaphone className="h-5 w-5" />
                    </Link>
                    <Link
                        href="/"
                        tabIndex={-1}
                        aria-disabled={true}
                        className="pointer-events-none text-neutral-400 transition-colors"
                    >
                        settings (soon)
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    )
}
