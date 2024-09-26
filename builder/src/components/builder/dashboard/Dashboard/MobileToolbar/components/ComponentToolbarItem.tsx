import { FunctionComponent } from "react"

import { ComponentElementType, PageDesignerComponents } from "../../ComponentElements/Component"
import { useDesigner } from "@/lib/hooks/useDesigner"
import { createUuid } from "@/lib/utils"
import { useSidebarStatus } from "@/lib/hooks/useSidebarStatus"

import { Button } from "@/components/ui/button"
import { SheetClose } from "@/components/ui/sheet"

type ToolbarItemProps = {
    item: ComponentElementType
}

export const ComponentToolbarItem: FunctionComponent<ToolbarItemProps> = ({ item }) => {
    const { icon, label } = item.designerButtonElement

    const { addComponent, components, setAddedComponent } = useDesigner()
    const { isDisabled } = useSidebarStatus(item.type)

    const handleAddComponent = () => {
        const newComponentId = createUuid()
        const newComponent = PageDesignerComponents[item.type].construct(newComponentId)
        addComponent(components.length, newComponent)
        setAddedComponent(newComponentId)
    }

    return (
        <SheetClose asChild>
            <Button
                disabled={isDisabled}
                className="flex h-24 flex-col items-center justify-center gap-2 rounded-md border border-neutral-200"
                variant="outline"
                onClick={handleAddComponent}
            >
                {icon}
                <p>{label}</p>
            </Button>
        </SheetClose>
    )
}
