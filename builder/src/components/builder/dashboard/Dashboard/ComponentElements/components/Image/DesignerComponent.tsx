import { FunctionComponent } from "react"

import { CustomImageInstance } from "./Component"
import { ComponentElementInstance } from "@/components/builder/dashboard/Dashboard/ComponentElements/Component"
import { Label } from "@/components/ui/label"

type ImageDesignerComponentProps = {
    instance: ComponentElementInstance
}

export const DesignerComponent: FunctionComponent<ImageDesignerComponentProps> = ({ instance }) => {
    const data = instance as CustomImageInstance
    const { label, helperText, src, alt, description } = data.extraAttributes

    return (
        <div className="rounded-md border-2 border-neutral-200 bg-white p-4">
            <Label className="mb-2 font-semibold">{label}</Label>
            {helperText && <p className="text-xs text-neutral-500">{helperText}</p>}

            <div className="mt-4 flex w-full flex-col gap-2 rounded-md bg-neutral-200 p-4">
                {src.url ? (
                    <img
                        className="h-96 w-full rounded object-cover object-center"
                        alt={alt}
                        src={src.url}
                    />
                ) : (
                    <p>upload an image</p>
                )}
                <p className="text text-balance text-sm">{description}</p>
            </div>
        </div>
    )
}
