import { z } from "zod"

// Add messages error messages for each field and validation rules
export const componentSchemas = {
    header: z.object({
        title: z.string().min(2),
        subtitle: z.string(),
        description: z.string(),
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
                price: z.coerce.number().min(1),
                currency: z.string().default("EUR"),
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
        direction: z.string().default('left'),
        cta: z.object({
            label: z.string().min(2),
            href: z.string().min(2),
            ariaLabel: z.string().min(2),
        }),
        image: z.object({
            src: z.string().min(2),
            alt: z.string().min(2),
        }).required(),
    }),
    // ... add more component schemas here
}

export type ComponentSchemaKey = keyof typeof componentSchemas
