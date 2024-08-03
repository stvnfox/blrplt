import { FunctionComponent } from "react"

import { cn } from "@/lib/utils"

import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

type StylingItemProps = {
    title: string
    value: string
    children: React.ReactNode
    className?: string
    last?: boolean
}

export const StylingItem: FunctionComponent<StylingItemProps> = ({ title, children, value, className, last }) => {
    return (
        <AccordionItem
            value={value}
            className={cn(!last && "border-b border-neutral-200")}
        >
            <AccordionTrigger className={cn('pb-4', className)}>
                <h2 className="text-2xl">{title}</h2>
            </AccordionTrigger>
            <AccordionContent className="space-y-4">{children}</AccordionContent>
        </AccordionItem>
    )
}
