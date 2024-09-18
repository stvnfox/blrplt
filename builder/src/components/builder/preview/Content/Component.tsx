import { FunctionComponent } from "react"

import { cn } from "@/lib/utils"
import { ComponentElementInstance } from "@/components/builder/dashboard/Dashboard/ComponentElements/Component"
import { CustomFeatureInstance } from "../../dashboard/Dashboard/ComponentElements/components/Feature/Component"

type ContentComponentProps = {
    instance: ComponentElementInstance
}

export const ContentComponent: FunctionComponent<ContentComponentProps> = ({ instance }) => {
    const data = instance as CustomFeatureInstance
    const { title, description, cta, image } = data.extraAttributes
    
    const imageLeft = image.position === "left"

    return (
            <section className="flex flex-col items-center py-12 md:py-24 md:flex-row gap-y-8">
                <div
                    className={cn(
                        "md:w-1/2 lg:max-w-lg",
                        imageLeft ? "order-0" : "order-0 md:order-1"
                    )}
                >
                    <img
                        className="h-full w-full rounded object-cover object-center"
                        alt={image.alt}
                        src={image.src.url}
                    />
                </div>
                <div
                    className={cn(
                        "flex flex-col items-center text-center w-full md:w-1/2 md:items-start md:text-left lg:flex-grow",
                        imageLeft ? "order-1 md:pl-16 lg:pl-24" : "order-0 md:pr-16 lg:pr-24"
                    )}
                >
                    <h2 className="mb-4 text-3xl font-medium text-primary sm:text-4xl">{title}</h2>
                    <p className="mb-8 leading-relaxed text-baseText">{description}</p>
                    {cta && (
                        <a
                            href={cta?.href}
                            aria-label={cta?.ariaLabel}
                            className="inline-flex rounded border-2 border-transparent bg-primary px-6 py-2 text-background transition-colors hover:border-primary hover:bg-background hover:text-primary focus:outline-none"
                        >
                            {cta?.label}
                        </a>
                    )}
                </div>
            </section>
    )
}
