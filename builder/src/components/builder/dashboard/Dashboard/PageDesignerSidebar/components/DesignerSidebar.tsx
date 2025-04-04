import { FunctionComponent } from "react"

import { PageDesignerComponents } from "../../ComponentElements/Component"

import { SidebarButton } from "./SidebarButton"

export const DesignerSidebar: FunctionComponent = () => {
    return (
        <div className="sticky top-24">
            <h2 className="mb-3">builder - components</h2>
            <div className="flex flex-col gap-y-2">
                <h3 className="mt-3 text-sm text-gray-500">unique</h3>
                <SidebarButton component={PageDesignerComponents.pricing} />
                <SidebarButton component={PageDesignerComponents.usps} />
                <SidebarButton component={PageDesignerComponents.faq} />
                <SidebarButton component={PageDesignerComponents.form} />
                <h3 className="mt-3 text-sm text-gray-500">unlimited</h3>
                <SidebarButton component={PageDesignerComponents.feature} />
                <SidebarButton component={PageDesignerComponents.image} />
            </div>
        </div>
    )
}
