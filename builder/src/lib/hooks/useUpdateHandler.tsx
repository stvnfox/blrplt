import { useMutation } from "@tanstack/react-query"
import { ComponentElementInstance } from "../../components/builder/dashboard/Dashboard/ComponentElements/Component"

type UpdatePageData = {
    siteId: string
    pageId: string
    token: string
    components: ComponentElementInstance[]
}

export const useUpdateHandler = () => {
    const mutation = useMutation({
        mutationFn: async (props: UpdatePageData) => {
            const { siteId, pageId, token, components } = props

            if (!siteId || !pageId || !token) return

            const data = {
                siteId,
                pageId,
                components,
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/page/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            })

            if (response.status === 401) {
                throw new Error("Unauthorized")
            }

            return response.json()
        },
    })

    return {
        updatePage: mutation,
    }
}
