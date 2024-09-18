import { FunctionComponent } from "react"

import { CustomFeatureInstance } from "./Component"
import { ComponentElementInstance } from "@/components/builder/dashboard/Dashboard/ComponentElements/Component"
import { cn } from "@/lib/utils"

import { Label } from "@/components/ui/label"

type FeatureDesignerComponentProps = {
    instance: ComponentElementInstance
}

export const DesignerComponent: FunctionComponent<FeatureDesignerComponentProps> = ({ instance }) => {
    const data = instance as CustomFeatureInstance
    const { label, helperText, title, description, cta, image } = data.extraAttributes

    const imageLeft = image.position === "left"

    return (
        <div className="rounded-md border-2 border-neutral-200 bg-white p-4">
            <Label className="mb-2 font-semibold">{label}</Label>
            {helperText && <p className="text-xs text-neutral-500">{helperText}</p>}

            <div className="mt-4 flex w-full flex-col gap-2 rounded-md bg-neutral-200 p-4">
                <section className="flex flex-col items-center gap-y-8 md:flex-row">
                    <div className={cn("md:w-1/2 lg:max-w-lg", imageLeft ? "order-0" : "order-0 md:order-1")}>
                        {image.src.url ? (
                            <img
                                className="h-full w-full rounded object-cover object-center"
                                alt={image.alt}
                                src={image.src.url}
                            />
                        ) : (
                            <p>upload an image</p>
                        )}
                    </div>
                    <div
                        className={cn(
                            "flex w-full flex-col items-center text-center md:w-1/2 md:items-start md:text-left lg:flex-grow",
                            imageLeft ? "order-1 md:pl-16 lg:pl-24" : "order-0 md:pr-16 lg:pr-24"
                        )}
                    >
                        <h2 className="text-balance text-xl md:text-3xl mb-2">{title}</h2>
                        <p className="text-balance mb-3">{description}</p>
                        {cta && (
                            <p className="inline-flex rounded border-2 border-transparent text-sm bg-white px-4 py-1">
                                {cta.label}
                            </p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}
