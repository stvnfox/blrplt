import { PortableTextBlock } from "next-sanity"
import { Image } from "sanity"

export interface OpenGraph {
    ogTitle: string
    ogDescription: PortableTextBlock[]
    ogImage?: Image
}