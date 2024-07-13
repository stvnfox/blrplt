import { FunctionComponent, useState } from "react"

import { useBuilderContext } from "@/providers/BuilderContextProvider"

import { Button } from "@/components/ui/button"

type RemoveComponentProps = {
    setOpen: () => void
    type: string
}

export const RemoveComponent: FunctionComponent<RemoveComponentProps> = ({ setOpen, type }) => {
    const { sites } = useBuilderContext()

    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)

    const removeComponent = async () => {
        setIsLoading(true)
        setHasError(false)

        const data = {
            siteId: sites[0].id,
            pageId: sites[0].pages[0]?.id,
            components: sites[0].pages[0]?.components.filter((component: any) => component.type !== type),
        }

        const response = await fetch("/api/builder/update-components", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.status === 200) {
            setOpen()
        } else {
            setHasError(true)
        }

        setIsLoading(false)
    }

    return (
        <>
            <Button
                type="button"
                disabled={isLoading}
                className="w-fit shadow-none"
                onClick={removeComponent}
            >
                i'm sure
            </Button>
            {hasError && <p className="text-sm">error removing component. try again later</p>}
        </>
    )
}
