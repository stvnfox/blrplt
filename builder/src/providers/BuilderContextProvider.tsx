"use client"

import { Prisma } from "@prisma/client";
import { createContext, useContext, useState } from "react"

export interface UserSite {
    id: string;
    name: string;
    url: string;
    userId: string;
    pages: Prisma.JsonValue[];
}[]

type BuilderContextProps = {
    children?: React.ReactNode
    userId: string
    userSites: UserSite[]
}

type BuilderContextInterface = {
    user: string
    sites: UserSite[]
}

const defaultValues = {
    user: "",
    sites: []
}

export const BuilderContext = createContext<BuilderContextInterface>(defaultValues)

export default function BuilderContextProvider(props: BuilderContextProps) {
    const { children, userId, userSites} = props
    const [user] = useState(userId)
    const [sites] = useState(userSites)

    return (
        <BuilderContext.Provider value={{ user, sites }}>
            {children}
        </BuilderContext.Provider>
    )
}

export const useBuilderContext = () => {
    const context = useContext(BuilderContext)

    if(!context) {
        throw new Error("useBuilderContext must be used within a BuilderContextProvider")
    }

    return context
}