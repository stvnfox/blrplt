import { z } from "zod"

import { Template } from "./types"

export const templateSettingsSchema = {
    template: z
        .object({
            choice: z.string().min(2, "Please select a template").default("minimal"),
            customOptions: z.object({
                backgroundColor: z.string(),
                textColor: z.string(),
                primaryColor: z.string(),
                secondaryColor: z.string(),
            }),
        })
        .superRefine((data, ctx) => {
            if (data.choice === Template.Custom) {
                if (data.customOptions.primaryColor === "") {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "please choose a primary color",
                        path: ["customOptions.primaryColor"],
                    })
                }

                if (data.customOptions.secondaryColor === "") {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "please choose a secondary color",
                        path: ["customOptions.secondaryColor"],
                    })
                }
                if (data.customOptions.backgroundColor === "") {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "please choose a background color",
                        path: ["customOptions.backgroundColor"],
                    })
                }

                if (data.customOptions.textColor === "") {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "please choose a text color",
                        path: ["customOptions.textColor"],
                    })
                }
            }
        }),
}
