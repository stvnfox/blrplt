import { prisma } from "@/lib/db"

export async function POST(req: Request) {
    const data = await req.json()

    const site = await prisma.site.findUnique({
        where: {
            id: data.siteId,
        },
        select: {
            pages: true,
        },
    });

    if (!site) {
        throw new Error('Site not found');
    }

        // Using any on page because types are not working with jsonb schema
    const updatedPages = site.pages.map((page: any) => {
        if (page?.name.toLowerCase() === data.page.toLowerCase()) {
            return { ...page, components: data.components };
        }
        return page;
    });

    const response = await prisma.site.update({
        where: {
            id: data.siteId,
        },
        data: {
            pages: updatedPages,
        },
    });

    return Response.json(response)
}
