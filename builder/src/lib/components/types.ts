export type ComponentOption = {
    value: string
    label: string
    disabled: boolean
}

export interface PricingItem {
    title: string;
    description: string;
    price: number | undefined;
    currency: string;
    mostPopular: boolean;
    includes: string[];
}

export interface Pricing {
    title: string;
    description: string;
    items: PricingItem[];
}

export interface UspItem {
    title: string;
    description: string;
}

export interface Usps {
    title: string;
    items: UspItem[];
}

export interface Header {
    title: string;
    subtitle: string;
    description: string;
}

// TODO: Add types for form fields
export type ComponentProps = {
    form: any
}

export interface ComponentDefaultValues {
    header: Header;
    usps: Usps;
    pricing: Pricing;
}

export type ComponentKey = keyof ComponentDefaultValues;

export type SelectorComponentKey = keyof ComponentDefaultValues;
export const selectorComponentKeys = ['header', 'usps', 'pricing'] as const;

export type SelectorComponentKeyType = typeof selectorComponentKeys[number];
