import { FunctionComponent } from "react"

import { TemplateChooser } from "./components/TemplateChooser"

export const StylingComponent: FunctionComponent = () => {
    return (
        <section className="px-4 md:px-8">
            <div className="border rounded-md border-neutral-100 px-6 py-4">
                <TemplateChooser />
            </div>
        </section>
    )
}