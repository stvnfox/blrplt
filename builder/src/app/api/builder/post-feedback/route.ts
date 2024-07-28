import { prisma } from "@/lib/db"

export async function POST(req: Request) {
    const data = await req.json()

    const response = await prisma.feedback.create({data})
    return Response.json(response)
}
