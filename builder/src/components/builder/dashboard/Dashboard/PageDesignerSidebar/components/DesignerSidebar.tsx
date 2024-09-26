import { FunctionComponent } from "react"

import { PageDesignerComponents } from "../../ComponentElements/Component"

import { SidebarButton } from "./SidebarButton"

export const DesignerSidebar: FunctionComponent = () => {
    return (
        <div className="sticky top-24">
            <h2 className="mb-3">builder - components</h2>
            <div className="flex flex-col gap-y-2">
                <SidebarButton component={PageDesignerComponents.pricing} />
                <SidebarButton component={PageDesignerComponents.usps} />
                <SidebarButton component={PageDesignerComponents.faq} />
                <SidebarButton component={PageDesignerComponents.feature} />
            </div>
        </div>
    )
}
