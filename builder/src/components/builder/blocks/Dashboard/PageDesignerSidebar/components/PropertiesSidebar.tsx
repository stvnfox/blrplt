import { FunctionComponent } from "react"

import { useDesigner } from "@/lib/hooks/useDesigner"
import { PageDesignerElements } from "../../ComponentElements/Component"

import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

export const PropertiesSidebar: FunctionComponent = () => {
    const { selectedComponent, setSelectedComponent } = useDesigner()

    if (!selectedComponent) return null

    const PropertiesForm = PageDesignerElements[selectedComponent.type].propertiesComponent

    const resetSelectedComponent = () => {
        setSelectedComponent(null)
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <h4 className="text-sm text-neutral-800">Component properties</h4>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetSelectedComponent}
                >
                    <XIcon size={16} />
                </Button>
            </div>
            <PropertiesForm instance={selectedComponent}/>
        </>
    )
}
