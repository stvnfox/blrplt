import { type SchemaTypeDefinition } from 'sanity'
import { pages } from './schemas/pages.schema'
import { header } from './schemas/objects/header.schema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pages, header],
}
