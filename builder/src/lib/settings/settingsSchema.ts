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
    headings: z.object({
        primary: z.string(),
        secondary: z.string(),
    }),
    font: z.object({
        style: z.string().default("sans-serif"),
    }),
    buttons: z.object({
        primary: z.object({
            background: z.string(),
            text: z.string(),
        }),
        secondary: z.object({
            background: z.string(),
            text: z.string(),
        }),
        style: z.string().default("default"),
    }),
    // ... add more settings schemas here
}

export type SettingsSchemaKey = keyof typeof settingsSchema
