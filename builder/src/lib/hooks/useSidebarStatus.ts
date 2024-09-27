import { useDesigner } from "./useDesigner"

// Add allowed types here
const allowedMultipleTimes = ["feature", "image"]

const canAddMultipleTimes = (type: string) => {
    return !allowedMultipleTimes.includes(type)
}

export const useSidebarStatus = (type: string) => {
    const { components } = useDesigner()

    const isOnDesignerPage = components.some((c) => c.type === type)
    const isDisabled = isOnDesignerPage && canAddMultipleTimes(type)

    return {
        isDisabled,
    }
}
