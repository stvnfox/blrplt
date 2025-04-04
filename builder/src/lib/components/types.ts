export type ComponentOption = {
    value: string
    label: string
    disabled: boolean
}

export interface Feature {
    title: string
    description?: string
    cta?: {
        label: string
        href: string
        ariaLabel: string
    }
    image: {
        src: {
            url: string
            extension: string
            path: string
        }
        alt: string
        position?: "left" | "right"
    }
}

export interface FaqItem {
    question: string
    answer: string
    id: string
}

export interface Faq {
    title: string
    description: string
    items: FaqItem[]
}

export interface PricingItem {
    title: string
    description: string
    price: number | undefined
    currency: string
    mostPopular: boolean
    includes: string[]
}

export interface Pricing {
    title: string
    description: string
    items: PricingItem[]
}

export interface UspItem {
    title: string
    description: string
}

export interface Usps {
    title: string
    description: string
    items: UspItem[]
}

export interface Header {
    title: string
    subtitle: string
    description: string
}

export interface Image {
    src: {
        url: string
        extension: string
        path: string
    }
    alt?: string
    description?: string
}

export interface Form {
    title: string
    description: string
    form: any
    // add more here
}

// TODO: Add types for form fields
export type ComponentProps = {
    form?: any
}

export interface ComponentDefaultValues {
    header: Header
    usps: Usps
    pricing: Pricing
    faq: Faq
    feature: Feature
    image: Image
    form: Form
}

export type ComponentKey = keyof ComponentDefaultValues

export type SelectorComponentKey = keyof ComponentDefaultValues
export const selectorComponentKeys = ["header", "usps", "pricing", "faq", "feature", "image", "form"] as const

export type SelectorComponentKeyType = (typeof selectorComponentKeys)[number]
