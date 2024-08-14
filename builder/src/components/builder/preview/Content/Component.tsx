import { FunctionComponent } from "react"

import { Content } from "@/lib/components/types"
import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"

type ContentComponentProps = {
    data: Content
}

export const ContentComponent: FunctionComponent<ContentComponentProps> = ({ data }) => {
    const imageLeft = data.image.position === "left"

    return (
        <section>
            <div className="container mx-auto flex flex-col items-center px-5 py-24 md:flex-row">
                <div
                    className={cn(
                        "mb-10 w-5/6 md:mb-0 md:w-1/2 lg:w-full lg:max-w-lg",
                        imageLeft ? "order-0" : "order-0 md:order-1"
                    )}
                >
                    <img
                        className="h-full w-full rounded object-cover object-center"
                        alt={data.image.alt}
                        src={data.image.src.url}
                    />
                </div>
                <div
                    className={cn(
                        "flex flex-col items-center text-center md:w-1/2 md:items-start  md:text-left lg:flex-grow ",
                        imageLeft ? "order-1 md:pl-16 lg:pl-24" : "order-0 md:pr-16 lg:pr-24"
                    )}
                >
                    <h2 className="text-primary mb-4 text-3xl font-medium sm:text-4xl">{data.title}</h2>
                    <p className="text-baseText mb-8 leading-relaxed">{data.description}</p>
                    {data.cta && (
                        // TODO: Implement button styles from settings
                        // <Button asChild variant={"link"} className={cn(getButtonLook(data.cta.buttonLook))}>
                        <a
                            href={data.cta?.href}
                            aria-label={data.cta?.ariaLabel}
                            className="bg-primary inline-flex rounded border-0 px-6 py-2 text-lg text-white focus:outline-none"
                        >
                            {data.cta?.label}
                        </a>
                        // </Button>
                    )}
                </div>
            </div>
        </section>
    )
}
