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
    // ... add more component schemas here
}

export type ComponentSchemaKey = keyof typeof componentSchemas
