import { FunctionComponent, useEffect, useRef } from "react"

import { CustomFaqInstance } from "./Component"
import { ComponentElementInstance } from "@/components/builder/dashboard/Dashboard/ComponentElements/Component"
import { useDesigner } from "@/lib/hooks/useDesigner"

import { Label } from "@/components/ui/label"

type FaqDesignerComponentProps = {
    instance: ComponentElementInstance
}

export const DesignerComponent: FunctionComponent<FaqDesignerComponentProps> = ({ instance }) => {
    const data = instance as CustomFaqInstance
    const { label, helperText, title, description, items } = data.extraAttributes

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
                <p className="text-balance text-xl text-primary md:text-3xl">{title}</p>
                <p className="text text-balance text-baseText">{description}</p>
                <div className="self-start">
                    {items.map((item, index) => {
                        return (
                            <div
                                key={`faq-item-${index}`}
                                className="mb-2"
                            >
                                <h5 className="mb-1 font-semibold">{item.question}</h5>
                                <p className="text-sm">{item.answer}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
