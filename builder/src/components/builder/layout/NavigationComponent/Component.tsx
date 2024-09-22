"use client"

import { FunctionComponent } from "react"
import Link from "next/link"
import { ExternalLink, HandMetal } from "lucide-react"

import { useBuilderContext } from "@/providers/BuilderContextProvider"

import { AccountMenu } from "./components/AccountMenu"
import { MobileNavigation } from "./components/MobileNavigation"
import { PublishButton } from "./components/PublishButton"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export const NavigationComponent: FunctionComponent = () => {
    const { sites } = useBuilderContext()

    return (
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-4 border-b bg-white px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href="/"
                    className="mr-6 flex items-center gap-2 text-lg font-semibold hover:underline hover:underline-offset-2 md:text-base"
                >
                    <HandMetal className="h-6 w-6" />
                    <span>blrplt builder</span>
                </Link>
            </nav>
            <MobileNavigation />
            <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-3">
                {sites[0] && (
                    <>
                        <TooltipProvider delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="h-9 w-9 p-0 shadow-none"
                                    >
                                        <a
                                            target="_blank"
                                            href={`/preview/${sites[0].url}`}
                                        >
                                            <ExternalLink size={20} />
                                        </a>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent
                                    className="border border-neutral-200 bg-white"
                                    align="end"
                                >
                                    <p className="text-black">open preview in new tab</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <PublishButton />
                    </>
                )}
                <Separator
                    orientation="vertical"
                    className="mr-2 h-16"
                />
                <AccountMenu />
            </div>
        </header>
    )
}
