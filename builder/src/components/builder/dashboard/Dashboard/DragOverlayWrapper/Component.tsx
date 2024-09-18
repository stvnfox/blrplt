import { FunctionComponent, useState } from 'react';
import { Active, DragOverlay, DragStartEvent, useDndMonitor } from '@dnd-kit/core';

import { ComponentsType, PageDesignerComponents } from '../ComponentElements/Component';
import { useDesigner } from '@/lib/hooks/useDesigner';

import { SidebarButtonOverlay } from '../PageDesignerSidebar/components/SidebarButtonOverlay';

export const DragOverlayWrapper: FunctionComponent = () => {
    const { components } = useDesigner()
    const [draggedItem, setDraggedItem] = useState<Active | null>(null)
    
    useDndMonitor({
        onDragStart: (event: DragStartEvent) => {
            setDraggedItem(event.active)
        },
        onDragCancel: () => {
            setDraggedItem(null)
        },
        onDragEnd: () => {
            setDraggedItem(null)
        }
    })

    if (!draggedItem) return null

    let node = <div>No drag overlay</div>
    const isSidebarButton = draggedItem?.data?.current?.isSidebarButton

    if (isSidebarButton) {
        const type: ComponentsType = draggedItem.data?.current?.type
        node = <SidebarButtonOverlay element={PageDesignerComponents[type]}/>
    }

    const isDesignerComponent = draggedItem?.data?.current?.isDesignerComponent

    if (isDesignerComponent) {
        const componentId = draggedItem.data?.current?.componentId
        const component = components.find((comp) => comp.id === componentId)

        if(!component) {
            node = <div>Component not found!</div>
        } else {
            const DesignerComponent = PageDesignerComponents[component.type].designerComponent

            node = (
                <div className='opacity-80 pointer pointer-events-none'>
                    <DesignerComponent instance={component}/>
                </div>
            )
        } 
    }

    return (
        <DragOverlay>{node}</DragOverlay>
    )
}