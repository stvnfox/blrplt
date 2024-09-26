import { FunctionComponent } from "react"

import { useDesigner } from "@/lib/hooks/useDesigner"
import { PageDesignerComponents } from "../../ComponentElements/Component"

import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

export const PropertiesSidebar: FunctionComponent = () => {
    const { selectedComponent, setSelectedComponent } = useDesigner()

    if (!selectedComponent) return null

    const PropertiesForm = PageDesignerComponents[selectedComponent.type].propertiesComponent

    const resetSelectedComponent = () => {
        setSelectedComponent(null)
    }

    return (
        <div className="sticky top-[92px]">
            <div className="-mt-1 flex items-center justify-between">
                <h4 className="text-neutral-800">component properties</h4>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetSelectedComponent}
                >
                    <XIcon size={16} />
                </Button>
            </div>
            <PropertiesForm instance={selectedComponent} />
        </div>
    )
}
