import { FunctionComponent } from "react"
import { Plus } from "lucide-react"

import { PageDesignerComponents } from "../../ComponentElements/Component"

import { ComponentToolbarItem } from "./ComponentToolbarItem"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"

export const ComponentToolbar: FunctionComponent = () => {
    return (
        <Sheet>
            <SheetTrigger className="fixed bottom-4 left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-black bg-black text-white transition-colors hover:bg-white hover:text-black">
                <Plus size={24} />
            </SheetTrigger>
            <SheetContent
                side="bottom"
                aria-describedby={undefined}
            >
                <SheetHeader>
                    <SheetTitle>builder - components</SheetTitle>
                    <SheetDescription>click on a component to add it to your page</SheetDescription>
                    <h3 className="!mt-3 text-sm text-gray-500">unique</h3>
                    <div className="grid gap-2 sm:grid-cols-2">
                        <ComponentToolbarItem item={PageDesignerComponents.pricing} />
                        <ComponentToolbarItem item={PageDesignerComponents.usps} />
                        <ComponentToolbarItem item={PageDesignerComponents.faq} />
                    </div>
                    <h3 className="!mt-3 text-sm text-gray-500">unlimited</h3>
                    <div className="grid gap-2 sm:grid-cols-2">
                        <ComponentToolbarItem item={PageDesignerComponents.feature} />
                        <ComponentToolbarItem item={PageDesignerComponents.image} />
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}
