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
    userEmail: string | undefined
    userSites: UserSite[]
}

type BuilderContextInterface = {
    user: string
    email: string | undefined
    sites: UserSite[]
    siteName: string
}

const defaultValues = {
    user: "",
    email: "",
    sites: [],
    siteName: ""
}

export const BuilderContext = createContext<BuilderContextInterface>(defaultValues)

export default function BuilderContextProvider(props: BuilderContextProps) {
    const { children, userId, userEmail, userSites} = props
    const [user] = useState(userId)
    const [email] = useState(userEmail)
    const [sites] = useState(userSites)
    const siteName = sites[0] ? sites[0].name : "blrplt builder"

    return (
        <BuilderContext.Provider value={{ user, email, sites, siteName }}>
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