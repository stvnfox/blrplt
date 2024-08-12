import { FunctionComponent } from "react"

import { getBackgroundColor, getHeadingColor, getTextColor } from "@/lib/components/defaultValues"
import { Header } from "@/lib/components/types"
import { cn } from "@/lib/utils"

type HeaderProps = {
    data: Header
}

export const HeaderComponent: FunctionComponent<HeaderProps> = ({ data }) => {
    return (
        <header className={cn("mt-16 py-24 text-center", getBackgroundColor(data.backgroundColor))}>
            <h1 className={cn("mb-2 text-7xl text-headings", getHeadingColor(data.headingColor))}>{data.title}</h1>
            <h2 className={cn("mb-5 text-3xl", getHeadingColor(data.headingColor))}>{data.subtitle}</h2>
            <p className={cn("text-sm", getTextColor(data.textColor))}>{data.description}</p>
        </header>
    )
}
