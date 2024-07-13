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
                cta: z.object({
                    label: z.string(),
                    link: z.string(),
                    ariaLabel: z.string(),
                }),
            })
        ),
    }),
    // ... add more component schemas here
}

export type ComponentSchemaKey = keyof typeof componentSchemas
