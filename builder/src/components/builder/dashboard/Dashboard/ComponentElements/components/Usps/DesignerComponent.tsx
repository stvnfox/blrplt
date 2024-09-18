import { FunctionComponent } from "react"

import { CustomUspsInstance } from "./Component"
import { ComponentElementInstance } from "@/components/builder/dashboard/Dashboard/ComponentElements/Component"

import { Label } from "@/components/ui/label"

type UspsDesignerComponentProps = {
    instance: ComponentElementInstance
}

export const DesignerComponent: FunctionComponent<UspsDesignerComponentProps> = ({ instance }) => {
    const data = instance as CustomUspsInstance
    const { label, helperText, title, description, items } = data.extraAttributes

    return (
        <div className="rounded-md border-2 border-neutral-200 bg-white p-4">
            <Label className="mb-2 font-semibold">{label}</Label>
            {helperText && <p className="text-xs text-neutral-500">{helperText}</p>}

            <div className="mt-4 flex w-full flex-col items-center gap-2 rounded-md bg-neutral-200 p-4">
                <p className="text-balance text-xl text-primary md:text-3xl">{title}</p>
                <p className="text text-balance text-baseText">{description}</p>
                <div className="flex flex-wrap justify-center">
                    {items.map((item, index) => {
                        return (
                            <div key={`usp-designer-${index}`} className="w-full p-4 lg:w-48">
                                <div className="flex-grow rounded-xl border-2 border-neutral-200 border-primary p-3">
                                    <h2 className="mb-3 text-pretty text-sm font-medium text-primary">{item.title}</h2>
                                    <p className="text-sm leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
