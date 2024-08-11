import { z } from "zod"

// Add messages error messages for each field and validation rules
export const componentSchemas = {
    header: z.object({
        title: z.string().min(2),
        subtitle: z.string(),
        description: z.string(),
        backgroundColor: z.string(),
        textColor: z.string(),
        headingColor: z.string(),
    }),
    usps: z.object({
        title: z.string().min(2),
        items: z.array(
            z.object({
                title: z.string(),
                description: z.string(),
            })
        ),
    }),
    pricing: z.object({
        title: z.string().min(2),
        description: z.string(),
        items: z.array(
            z.object({
                title: z.string().min(2),
                description: z.string(),
                price: z.coerce.number().min(0),
                currency: z.string().default("EUR"),
                mostPopular: z.boolean().default(false),
                includes: z.array(
                    z.string()
                ),
            })
        ),
    }),
    faq: z.object({
        title: z.string().min(2),
        description: z.string(),
        items: z.array(
            z.object({
                question: z.string().min(2),
                answer: z.string().min(2),
                id: z.string().min(2),
            })
        ),
    }),
    content: z.object({
        title: z.string().min(2),
        description: z.string(),
        cta: z.object({
            label: z.string().min(2),
            href: z.string().min(1),
            ariaLabel: z.string().min(2),
        }),
        image: z.object({
            src: z.object({
                url: z.string().min(1),
                extension: z.string().min(2),
                path: z.string().min(2),
            }).refine((data) => data.url !== "", { message: "Please upload an image." }),
            alt: z.string().min(2),
            position: z.string().default('left'),
        }).required(),
    }),
    // ... add more component schemas here
}

export type ComponentSchemaKey = keyof typeof componentSchemas
