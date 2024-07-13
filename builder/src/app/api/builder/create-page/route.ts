import { prisma } from "@/lib/db"

export async function POST(req: Request) {
    const data = await req.json()

    const response = await prisma.site.update({
        where: {
            id: data.siteId
        },
        data: {
            pages: [
                ...data.pages,
                {
                    name: data.name,
                    url: data.url,
                    id: data.id,
                    components: data.components
                }
            ]
        }
    })

    return Response.json(response)
}
