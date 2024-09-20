"use client"

import { FunctionComponent, useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CreateSiteForm } from "./components/CreateSiteForm"

export const CreateSiteComponent: FunctionComponent = () => {
    const [open, setOpen] = useState(false)

    const closeAfterSubmit = () => {
        setOpen(false)

        //TODO: Check if there is a better way to reload the page
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button className="w-fit">create website</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>create website</DialogTitle>
                    <DialogDescription>
                        welcome to blrplt builder! let's get started by creating your website.
                    </DialogDescription>
                </DialogHeader>
                <CreateSiteForm setOpen={closeAfterSubmit} />
            </DialogContent>
        </Dialog>
    )
}
