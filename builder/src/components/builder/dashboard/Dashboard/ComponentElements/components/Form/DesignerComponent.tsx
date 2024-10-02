import { FunctionComponent, useEffect, useRef } from "react"

import { CustomFormInstance } from "./Component"
import { ComponentElementInstance } from "@/components/builder/dashboard/Dashboard/ComponentElements/Component"
import { useDesigner } from "@/lib/hooks/useDesigner"

import { Label } from "@/components/ui/label"

type FormDesignerComponentProps = {
    instance: ComponentElementInstance
}

export const DesignerComponent: FunctionComponent<FormDesignerComponentProps> = ({ instance }) => {
    const data = instance as CustomFormInstance
    const { label, helperText, title, description } = data.extraAttributes

    const { addedComponent } = useDesigner()
    const addedElementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (addedComponent && addedComponent === instance.id && addedElementRef.current) {
            addedElementRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
        }
    }, [addedComponent])

    return (
        <div
            ref={addedElementRef}
            className="rounded-md border-2 border-neutral-200 bg-white p-4"
        >
            <Label className="mb-2 font-semibold">{label}</Label>
            {helperText && <p className="text-xs text-neutral-500">{helperText}</p>}

            <div className="mt-4 flex w-full flex-col items-center gap-2 rounded-md bg-neutral-200 p-4">
                <h3 className="text-balance text-3xl text-primary md:text-4xl">{title}</h3>
                <p className="text text-balance text-baseText">{description}</p>
            </div>
        </div>
    )
}
