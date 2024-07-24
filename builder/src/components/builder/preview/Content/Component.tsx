import { FunctionComponent } from "react"
import clsx from "clsx"

import { Content } from "@/lib/components/types"

type ContentComponentProps = {
    data: Content
}

export const ContentComponent: FunctionComponent<ContentComponentProps> = ({ data }) => {
    const imageLeft = data.image.position === "left"

    return (
        <section className="body-font text-gray-600">
            <div className="container mx-auto flex flex-col items-center px-5 py-24 md:flex-row">
                <div
                    className={clsx(
                        "mb-10 w-5/6 md:mb-0 md:w-1/2 lg:w-full lg:max-w-lg",
                        imageLeft ? "order-0" : "order-0 md:order-1"
                    )}
                >
                    <img
                        className="rounded object-cover object-center"
                        alt={data.image.src}
                        src={data.image.src}
                    />
                </div>
                <div
                    className={clsx(
                        "flex flex-col items-center text-center md:w-1/2 md:items-start  md:text-left lg:flex-grow ",
                        imageLeft ? "order-1 md:pl-16 lg:pl-24" : "order-0 md:pr-16 lg:pr-24"
                    )}
                >
                    <h2 className="title-font mb-4 text-3xl font-medium text-gray-900 sm:text-4xl">{data.title}</h2>
                    <p className="mb-8 leading-relaxed">{data.description}</p>
                    {data.cta && (
                        <a
                            href={data.cta?.href}
                            aria-label={data.cta?.ariaLabel}
                            className="inline-flex rounded border-0 bg-indigo-500 px-6 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none"
                        >
                            {data.cta?.label}
                        </a>
                    )}
                </div>
            </div>
        </section>
    )
}
