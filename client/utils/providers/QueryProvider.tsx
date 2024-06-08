'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { FunctionComponent, ReactNode, useState } from "react"

interface QueryProviderProps {
    children: ReactNode
}

export const QueryProvider: FunctionComponent<QueryProviderProps> = (props: QueryProviderProps) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {props.children}
        </QueryClientProvider>
    )
}