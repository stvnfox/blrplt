"use client"

import { FunctionComponent } from "react"
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core"

import { cn, createUuid } from "@/lib/utils"
import { useDesigner } from "@/lib/hooks/useDesigner"
import { ComponentsType, PageDesignerComponents } from "../ComponentElements/Component"

import { DesignerComponentWrapper } from "../DesignerComponentWrapper/Component"

export const PageDesigner: FunctionComponent = () => {
    const { components, addComponent, removeComponent, selectedComponent, setSelectedComponent } = useDesigner()

    const droppable = useDroppable({
        id: "page-designer-area",
        data: {
            isPageDesignerArea: true,
        },
    })

    const resetSelectedComponent = () => {
        if (selectedComponent) setSelectedComponent(null)
    }

    const totalAddedComponents = components.length

    useDndMonitor({
        onDragEnd: (event: DragEndEvent) => {
            const { active, over } = event

            if (!active || !over) return

            const isSidebarButton = active.data?.current?.isSidebarButton
            const isDroppingOverDesignerDropArea = over.data?.current?.isPageDesignerArea
            const droppingSidebarButtonOverDropArea = isSidebarButton && isDroppingOverDesignerDropArea
            if (droppingSidebarButtonOverDropArea) {
                const type: ComponentsType = active.data?.current?.type
                const newComponent = PageDesignerComponents[type].construct(createUuid())

                addComponent(totalAddedComponents, newComponent)
                return
            }

            const isDroppingOverDesignerComponentTopHalf = over.data?.current?.isTopHalf
            const isDroppingOverDesignerComponentBottomHalf = over.data?.current?.isBottomHalf
            const droppingOverDesignerComponent =
                isDroppingOverDesignerComponentTopHalf || isDroppingOverDesignerComponentBottomHalf
            const droppingSidebarButtonOverDesignerComponent = isSidebarButton && droppingOverDesignerComponent
            if (droppingSidebarButtonOverDesignerComponent) {
                const type: ComponentsType = active.data?.current?.type
                const newComponent = PageDesignerComponents[type].construct(createUuid())

                const overId = over.data?.current?.elementId
                const componentIndex = components.findIndex((component) => component.id === overId)

                if (componentIndex === -1) {
                    throw new Error("component not found")
                }

                let indexNewComponent = componentIndex
                if (isDroppingOverDesignerComponentBottomHalf) {
                    indexNewComponent += 1
                }

                addComponent(indexNewComponent, newComponent)
                return
            }

            const isDraggingDesignerComponent = active.data?.current?.isDesignerComponent
            const isDraggingOverDesignerComponent = droppingOverDesignerComponent && isDraggingDesignerComponent
            if (isDraggingOverDesignerComponent) {
                const activeId = active.data?.current?.componentId
                const overId = over.data?.current?.elementId

                const activeComponentIndex = components.findIndex((component) => component.id === activeId)
                const overComponentIndex = components.findIndex((component) => component.id === overId)

                if (activeComponentIndex === -1 || overComponentIndex === -1) {
                    throw new Error("component not found")
                }

                const activeComponent = { ...components[activeComponentIndex] }
                removeComponent(activeId)

                let indexNewComponent = overComponentIndex
                if (isDroppingOverDesignerComponentBottomHalf) {
                    indexNewComponent + 1
                }

                addComponent(indexNewComponent, activeComponent)
                return
            }
        },
    })

    return (
        <div
            className="h-full w-full"
            onClick={resetSelectedComponent}
        >
            <div
                ref={droppable.setNodeRef}
                className={cn(
                    "flex h-full w-full flex-col items-center overflow-y-auto rounded-md p-4",
                    droppable.isOver && "ring-2 ring-neutral-600/20"
                )}
            >
                {components.length > 0 && (
                    <div className="flex w-full flex-col gap-4">
                        {components.map((component) => {
                            return (
                                <DesignerComponentWrapper
                                    key={component.id}
                                    component={component}
                                />
                            )
                        })}
                    </div>
                )}
                {droppable.isOver && components.length === 0 && (
                    <div className="h-32 w-full rounded-md border-2 border-neutral-200 bg-neutral-50 p-4"></div>
                )}
                {!droppable.isOver && components.length === 0 && (
                    <h3 className="text-muted-foreground flex flex-grow items-center justify-center text-xl font-bold">
                        drop any component here
                    </h3>
                )}
            </div>
        </div>
    )
}
