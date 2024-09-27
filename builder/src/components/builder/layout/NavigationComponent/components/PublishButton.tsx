import { FunctionComponent, useEffect } from "react"

import { useDesigner } from "@/lib/hooks/useDesigner"
import { useBuilderContext } from "@/providers/BuilderContextProvider"
import { useUpdateHandler } from "@/lib/hooks/useUpdateHandler"
import { useToast } from "@/lib/hooks/useToast"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export const PublishButton: FunctionComponent = () => {
    const { components } = useDesigner()
    const { siteId, pageId, token } = useBuilderContext()
    const { updatePage } = useUpdateHandler()
    const { toast } = useToast()

    useEffect(() => {
        if (updatePage.isError) {
            toast({
                title: "meh..",
                description:
                    "something went wrong while updating the page, please try again later or try to login again",
                variant: "destructive",
            })
        }

        if (updatePage.isSuccess) {
            toast({
                title: "yeey! 🚀",
                description: "the page has been published successfully",
            })
        }
    }, [updatePage.isSuccess, updatePage.isError])

    return (
        <Button
            variant="default"
            className="mr-3 shadow-none"
            disabled={updatePage.isPending}
            onClick={() =>
                updatePage.mutate({
                    siteId,
                    pageId,
                    token,
                    components,
                })
            }
        >
            {updatePage.isPending ? <Spinner /> : "publish"}
        </Button>
    )
}
