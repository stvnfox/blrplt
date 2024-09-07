import { FunctionComponent } from "react"
import { useDraggable } from "@dnd-kit/core"

import { cn } from "@/lib/utils"
import { ComponentElementType } from "../../ComponentElements/Component"

import { Button } from "@/components/ui/button"

type SidebarButtonProps = {
    component: ComponentElementType
}

export const SidebarButton: FunctionComponent<SidebarButtonProps> = ({ component }) => {
    const { label, icon } = component.designerButtonElement

    const draggable = useDraggable({
        id: `sidebar-button-${component.type}`,
        data: {
            type: component.type,
            isSidebarButton: true
        }
    })

    return (
        <Button
            ref={draggable.setNodeRef} 
            variant="outline"
            className={cn("flex h-auto w-full cursor-grab items-center gap-2 py-4 shadow-none", 
                draggable.isDragging && "ring-2 ring-primary"
            )}
            {...draggable.listeners}
            {...draggable.attributes}
        >
            {icon}
            <p>{label}</p>
        </Button>
    )
}
