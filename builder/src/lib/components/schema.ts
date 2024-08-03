import { z } from "zod"
import { componentSchemas, ComponentSchemaKey } from "./componentSchemas"

export function createCombinedSchema(components: ComponentSchemaKey[]) {
    const schemaObject: Record<string, z.ZodTypeAny> = {}

    components.forEach((component) => {
        if (component in componentSchemas) {
            schemaObject[component] = componentSchemas[component]
        } else {
            throw new Error(`Schema for component '${component}' not found.`)
        }
    })

    return z.object(schemaObject)
}
