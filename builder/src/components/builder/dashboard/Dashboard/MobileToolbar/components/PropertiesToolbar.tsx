import { FunctionComponent, useState } from "react"

import { useDesigner } from "@/lib/hooks/useDesigner"
import { PageDesignerComponents } from "../../ComponentElements/Component"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"

export const PropertiesToolbar: FunctionComponent = () => {
    const { selectedComponent, setSelectedComponent } = useDesigner()
    const [sheetIsOpen, setSheetIsOpen] = useState(selectedComponent ? true : false)

    if (!selectedComponent) return null

    const PropertiesForm = PageDesignerComponents[selectedComponent.type].propertiesComponent

    return (
        <Sheet
            open={sheetIsOpen}
            onOpenChange={(e) => [setSheetIsOpen(e), setSelectedComponent(null)]}
        >
            <SheetContent
                side="bottom"
                aria-describedby={undefined}
            >
                <SheetHeader>
                    <SheetTitle>component properties</SheetTitle>
                    <SheetDescription>click on a component to add it to your page</SheetDescription>
                </SheetHeader>
                <PropertiesForm instance={selectedComponent} />
            </SheetContent>
        </Sheet>
    )
}
