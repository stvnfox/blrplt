"use client"

import { createContext, Dispatch, SetStateAction, useState } from "react"

import { ComponentElementInstance } from "@/components/builder/blocks/Dashboard/ComponentElements/Component"

type DesignerContext = {
    components: ComponentElementInstance[]
    addComponent: (index: number, component: ComponentElementInstance) => void
    removeComponent: (id: string) => void
    selectedComponent: ComponentElementInstance | null
    setSelectedComponent: Dispatch<SetStateAction<ComponentElementInstance | null>>
    updateComponent: (id: string, component: ComponentElementInstance) => void
}

export const DesignerContext = createContext<DesignerContext | null>(null)

type DesignerContextProviderProps = {
    components: ComponentElementInstance[]
    children: React.ReactNode
}

export default function DesignerContextProvider(props: DesignerContextProviderProps) {
    const { children, components: savedComponents } = props
    const [components, setComponents] = useState<ComponentElementInstance[]>(savedComponents)
    const [selectedComponent, setSelectedComponent] = useState<ComponentElementInstance | null>(null)

    const addComponent = (index: number, component: ComponentElementInstance) => {
        setComponents((prev) => {
            const newComponents = [...prev]
            newComponents.splice(index, 0, component)

            return newComponents
        })
    }

    const removeComponent = (id: string) => {
        setComponents((prev) => prev.filter((element) => element.id !== id))
    }

    const updateComponent = (id: string, component: ComponentElementInstance) => {
        setComponents((prev) => {
            const newComponents = [...prev]
            const index = newComponents.findIndex((element) => element.id === id)

            newComponents[index] = component

            return newComponents
        })
    }

    return (
        <DesignerContext.Provider
            value={{
                components,
                addComponent,
                removeComponent,
                selectedComponent,
                setSelectedComponent,
                updateComponent,
            }}
        >
            {children}
        </DesignerContext.Provider>
    )
}
