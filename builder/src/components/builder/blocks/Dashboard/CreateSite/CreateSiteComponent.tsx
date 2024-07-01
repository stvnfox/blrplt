"use client"

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

export function CreateSiteComponent() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>create website</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>create website</DialogTitle>
                    <DialogDescription>
                        welcome to blrplt builder! let's get started by creating your website.
                    </DialogDescription>
                </DialogHeader>
                <CreateSiteForm />
            </DialogContent>
        </Dialog>
    )
}
