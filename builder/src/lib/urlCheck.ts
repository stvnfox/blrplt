"use server"

import { prisma } from "./db"

export const checkIfUrlIsAvailable = async (url: string) => {
    const data = await prisma.site.findMany({
        where: {
            url: url,
        }
    })

    if(data.length === 0) {
        return true
    }
    
    return false
}