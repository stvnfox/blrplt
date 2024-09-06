import { FunctionComponent } from "react"

import { ComponentElementType } from "../../ComponentElements/Component"

import { Button } from "@/components/ui/button"

type SidebarButtonOverlayProps = {
    element: ComponentElementType
}

export const SidebarButtonOverlay: FunctionComponent<SidebarButtonOverlayProps> = ({ element }) => {
    const { label, icon } = element.designerButtonElement

    return (
        <Button
            variant="outline"
            className="flex h-auto w-full items-center gap-2 py-4 shadow-none cursor-grabbing hover:bg-black/90 hover:text-white"
        >
            {icon}
            <p>{label}</p>
        </Button>
    )
}
