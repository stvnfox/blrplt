import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CreatePageForm } from "./components/CreatePageForm"


export function CreatePageComponent() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="mt-4 shadow-none">create page</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>create page</DialogTitle>
                </DialogHeader>
                <CreatePageForm>
                    {/* TODO: Close Dialog when submitted */}
                    {/* <DialogClose asChild className="mt-4"> */}
                        <Button type="submit">create page!</Button>
                    {/* </DialogClose> */}
                </CreatePageForm>
            </DialogContent>
        </Dialog>
    )
}
