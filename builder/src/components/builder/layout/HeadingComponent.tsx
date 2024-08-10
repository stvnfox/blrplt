import { FunctionComponent } from "react"

import { useBuilderContext } from "@/providers/BuilderContextProvider"
import { cn } from "@/lib/utils"

type HeadingProps = {
    title: string
    className?: string
    firstHeading?: boolean
}

export const HeadingComponent: FunctionComponent<HeadingProps> = ({ title, firstHeading, className }) => {
    const { siteName } = useBuilderContext()

    return (
        <div className={cn("flex w-full items-center justify-between px-4 pt-4 md:px-8 md:pt-8", className)}>
            {firstHeading ? (
                <h1>
                    {siteName ? siteName : "blrplt builder"} - {title}
                </h1>
            ) : (
                <h2>
                    {siteName ? siteName : "blrplt builder"} - {title}
                </h2>
            )}
        </div>
    )
}
