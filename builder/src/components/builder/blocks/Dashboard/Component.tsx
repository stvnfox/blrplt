import { FunctionComponent } from "react"
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"

import { PageDesigner } from "./PageDesigner/Component"
import { PageDesignerSidebar } from "./PageDesignerSidebar/Component"
import { DragOverlayWrapper } from "./DragOverlayWrapper/Component"

export const DashboardComponent: FunctionComponent = () => {
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10, //10px
        }
    })

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 300, //300ms
            tolerance: 5, //5px
        }
    })

    const sensors = useSensors(mouseSensor, touchSensor)

    return (
        <DndContext sensors={sensors}>
            <section className="flex flex-grow">
                <div className="px-4 pt-4 md:px-8 md:py-8 md:w-3/4">
                    <div className="h-full w-full rounded-md bg-neutral-100 dark:bg-neutral-800">
                        <PageDesigner />
                    </div>
                </div>
                <div className="border-l border-neutral-100 p-4 md:p-8 md:w-1/4 ">
                    <PageDesignerSidebar />
                </div>
            </section>
            <DragOverlayWrapper />
        </DndContext>
    )
}
