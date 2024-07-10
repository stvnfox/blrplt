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
import { ComponentSelector } from "./components/ComponentSelector"

export const AddComponentButton = () => {
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
                    variant="outline"
                    className="w-fit shadow-none"
                >
                    add component
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>add component</DialogTitle>
                    <DialogDescription>
                        choose a component to enhance your page. browse through the options below and add the one that fits your needs with a single click.
                    </DialogDescription>
                </DialogHeader>
                <ComponentSelector setOpen={closeAfterSubmit} />
            </DialogContent>
        </Dialog>
    )
}
