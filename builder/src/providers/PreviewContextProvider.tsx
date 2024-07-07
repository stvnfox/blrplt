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
    userId: string
    userSites: UserSite[]
}

type PreviewContextInterface = {
    user: string
    sites: UserSite[]
    siteName: string
}

const defaultValues = {
    user: "",
    sites: [],
    siteName: ""
}

export const PreviewContext = createContext<PreviewContextInterface>(defaultValues)

export default function PreviewContextProvider(props: PreviewContextProps) {
    const { children, userId, userSites} = props
    const [user] = useState(userId)
    const [sites] = useState(userSites)
    const siteName = sites[0].name

    return (
        <PreviewContext.Provider value={{ user, sites, siteName }}>
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