import { useState } from "react"
import { useDraggable, useDroppable } from "@dnd-kit/core"
import { Trash2 } from "lucide-react"

import { ComponentElementInstance, PageDesignerComponents } from "../ComponentElements/Component"
import { cn } from "@/lib/utils"
import { useDesigner } from "@/lib/hooks/useDesigner"

import { Button } from "@/components/ui/button"

export const DesignerComponentWrapper = ({ component }: { component: ComponentElementInstance }) => {
    const { removeComponent, setSelectedComponent } = useDesigner()
    const [mouseIsOver, setMouseIsOver] = useState(false)

    const DesignerElement = PageDesignerComponents[component.type].designerComponent

    const topHalf = useDroppable({
        id: component.id + "-top",
        data: {
            type: component.type,
            elementId: component.id,
            isTopHalf: true,
        },
    })

    const bottomHalf = useDroppable({
        id: component.id + "-bottom",
        data: {
            type: component.type,
            elementId: component.id,
            isBottomHalf: true,
        },
    })

    const draggable = useDraggable({
        id: component.id + "-drag-handler",
        data: {
            type: component.type,
            componentId: component.id,
            isDesignerComponent: true,
        },
    })

    if (draggable.isDragging) return null

    const handleSelectComponent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setSelectedComponent(component)
    }

    const handleRemoveComponent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        removeComponent(component.id)
        setSelectedComponent(null)
    }

    return (
        <div
            ref={draggable.setNodeRef}
            {...draggable.listeners}
            {...draggable.attributes}
            className="relative hover:cursor-pointer"
            onMouseOver={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
            onClick={(e) => handleSelectComponent(e)}
        >
            <div
                ref={topHalf.setNodeRef}
                className="absolute h-1/2 w-full rounded-t-md"
            />
            <div
                ref={bottomHalf.setNodeRef}
                className="absolute bottom-0 h-1/2 w-full rounded-b-md"
            />
            {mouseIsOver && (
                <div className="absolute h-full w-full rounded-md border-2 border-neutral-200 bg-white/80">
                    <div className="absolute right-0 z-10 h-full">
                        <Button
                            className="flex h-full w-24 justify-center rounded-l-none rounded-r-md border-red-500 bg-red-500 text-white shadow-none hover:bg-red-600 hover:text-white"
                            variant="outline"
                            onClick={(e) => handleRemoveComponent(e)}
                        >
                            <Trash2 />
                        </Button>
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <p className="animate-pulse text-sm font-semibold text-black">
                            Click for properties or drag to move
                        </p>
                    </div>
                </div>
            )}
            {topHalf.isOver && <div className="absolute h-2 w-full rounded-t-md bg-neutral-600" />}
            <div className={cn("rounded-md transition-opacity", mouseIsOver && "bg-neutral-600/20")}>
                <DesignerElement instance={component} />
            </div>
            {bottomHalf.isOver && <div className="absolute bottom-0 h-2 w-full rounded-b-md bg-neutral-600" />}
        </div>
    )
}
