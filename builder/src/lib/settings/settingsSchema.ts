import { z } from "zod"

// Add error messages for each field and validation rules
export const settingsSchema = {
    background: z.object({
        primary: z.string(),
        secondary: z.string(),
        tertiary: z.string(),
    }),
    text: z.object({
        primary: z.string(),
        secondary: z.string(),
        tertiary: z.string(),
    }),
    headings: z.string().optional(),
    font: z.object({
        style: z.string().default("sans-serif"),
    }),
    // ... add more settings schemas here
}

export type SettingsSchemaKey = keyof typeof settingsSchema
