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

type PreviewContextProps = {
    children?: React.ReactNode
    userSites: UserSite[]
}

type PreviewContextInterface = {
    sites: UserSite[]
    siteName: string
}

const defaultValues = {
    sites: [],
    siteName: ""
}

export const PreviewContext = createContext<PreviewContextInterface>(defaultValues)

export default function PreviewContextProvider(props: PreviewContextProps) {
    const { children, userSites} = props
    const [sites] = useState(userSites)
    const siteName = sites[0].name

    return (
        <PreviewContext.Provider value={{ sites, siteName }}>
            {children}
        </PreviewContext.Provider>
    )
}

export const usePreviewContext = () => {
    const context = useContext(PreviewContext)

    if(!context) {
        throw new Error("usePreviewContext must be used within a PreviewContextProvider")
    }

    return context
}