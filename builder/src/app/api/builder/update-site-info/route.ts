import { prisma } from "@/lib/db"

export async function POST(req: Request) {
    const data = await req.json()

    const response = await prisma.site.update({
        where: {
            id: data.id
        },
        data: {
            name: data.name,
            url: data.url
        }
    
    })

    console.log(response)
    return Response.json(response)
}

