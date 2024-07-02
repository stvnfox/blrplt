import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CreatePageForm } from "./components/CreatePageForm"


export function CreatePageComponent() {
    const [open, setOpen] = useState(false)

    const closeAfterSubmit = () => {
        setOpen(false)

        //TODO: Check if there is a better way to reload the page
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="mt-4 shadow-none">create page</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>create page</DialogTitle>
                </DialogHeader>
                <CreatePageForm setOpen={closeAfterSubmit}/>
            </DialogContent>
        </Dialog>
    )
}
