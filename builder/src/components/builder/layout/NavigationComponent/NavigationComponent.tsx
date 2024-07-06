import { FunctionComponent } from "react"
import Link from "next/link"
import { HandMetal } from "lucide-react"

import { AccountMenu } from "./components/AccountMenu"
import { MobileNavigation } from "./components/MobileNavigation"

export const NavigationComponent: FunctionComponent = () => {
    return (
        <header className="bg-background sticky top-0 flex h-16 items-center justify-between gap-4 border-b px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <div className="flex items-center gap-2 text-lg font-semibold md:text-base mr-6">
                    <HandMetal className="h-6 w-6" />
                    <span>blrplt builder</span>
                </div>
                <Link
                    href="/"
                    className="text-foreground hover:text-foreground transition-colors"
                >
                    dashboard
                </Link>
                <Link
                    href="/"
                    tabIndex={-1}
                    aria-disabled={true}
                    className="text-neutral-400 pointer-events-none transition-colors"
                >
                    settings (soon)
                </Link>
            </nav>
            <MobileNavigation />
            <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <AccountMenu />
            </div>
        </header>
    )
}
