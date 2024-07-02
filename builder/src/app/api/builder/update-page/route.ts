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

    const updatedPages = site.pages.map((page) => {
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

    console.log(response);

    return Response.json(response)
}
