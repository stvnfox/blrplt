import { FunctionComponent } from "react"
import Image from "next/image"

import { CustomImageInstance } from "../../dashboard/Dashboard/ComponentElements/components/Image/Component"
import { ComponentElementInstance } from "@/components/builder/dashboard/Dashboard/ComponentElements/Component"

type ImageProps = {
    instance: ComponentElementInstance
}

export const ImageComponent: FunctionComponent<ImageProps> = ({ instance }) => {
    const data = instance as CustomImageInstance
    const { src, alt, description } = data.extraAttributes

    if (!src.url) return null

    return (
        <section className="py-6 text-center sm:pb-12 sm:pt-40 md:py-12 md:pt-48">
            <div className="mx-auto max-w-screen-lg">
                <Image
                    src={src.url}
                    width={1024}
                    height={500}
                    objectFit="cover"
                    alt={alt}
                    className="rounded-md"
                />
                {description && <p className="text mt-2 text-balance text-sm">{description}</p>}
            </div>
        </section>
    )
}
