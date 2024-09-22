"use client"

import { Prisma } from "@prisma/client"
import { createContext, useContext, useState } from "react"

export interface UserSite {
    id: string
    name: string
    url: string
    userId: string
    settings: Prisma.JsonValue
    pages: Prisma.JsonValue[]
}
;[]

type BuilderContextProps = {
    children?: React.ReactNode
    userId: string
    userEmail: string | undefined
    userSites: UserSite[]
}

type BuilderContextInterface = {
    token: string
    setToken: React.Dispatch<React.SetStateAction<string>>
    user: string
    email: string | undefined
    sites: UserSite[]
    updateSites: React.Dispatch<React.SetStateAction<UserSite[]>>
    siteName: string
    siteId: string
    pageId: string
}

const defaultValues = {
    token: "",
    setToken: () => {},
    user: "",
    email: "",
    sites: [],
    updateSites: () => {},
    siteName: "",
    siteId: "",
    pageId: "",
}

export const BuilderContext = createContext<BuilderContextInterface>(defaultValues)

const getTokenFromStorage = () => {
    if(typeof window === "undefined") return ""
    
    return sessionStorage.getItem("token") || ""
}

export default function BuilderContextProvider(props: BuilderContextProps) {
    const { children, userId, userEmail, userSites } = props
    const [user] = useState(userId)
    const [email] = useState(userEmail)
    const [sites, updateSites] = useState(userSites)
    const [token, setToken] = useState(getTokenFromStorage())
    const siteName = sites[0] ? sites[0].name : "blrplt builder"
    const siteId = sites[0] ? sites[0].id : ""
    // @ts-expect-error - pages is a jsonb column so no types are available
    const pageId = sites[0].pages[0]?.id

    return (
        <BuilderContext.Provider value={{ token, setToken, user, email, sites, updateSites, siteName, siteId, pageId }}>
            {children}
        </BuilderContext.Provider>
    )
}

export const useBuilderContext = () => {
    const context = useContext(BuilderContext)

    if (!context) {
        throw new Error("useBuilderContext must be used within a BuilderContextProvider")
    }

    return context
}
