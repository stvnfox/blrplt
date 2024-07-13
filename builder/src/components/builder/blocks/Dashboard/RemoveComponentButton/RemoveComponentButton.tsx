import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { RemoveComponent } from "./components/RemoveComponent"

export const RemoveComponentButton = ({component}: {component: string}) => {
    const [open, setOpen] = useState(false)

    const closeAfterSubmit = () => {
        setOpen(false)

        //TODO: Check if there is a better way to reload the page
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    variant="destructive"
                    className="w-fit shadow-none mt-8"
                >
                    remove component
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>remove component</DialogTitle>
                    <DialogDescription>are you sure you want to remove the {component} component from your page?</DialogDescription>
                </DialogHeader>
                <RemoveComponent
                    type={component}
                    setOpen={closeAfterSubmit}
                />
            </DialogContent>
        </Dialog>
    )
}
