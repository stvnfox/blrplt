export type ComponentOption = {
    value: string
    label: string
    disabled: boolean
}

export interface Cta {
    label: string;
    link: string;
    ariaLabel: string;
}

export interface UspItem {
    title: string;
    description: string;
    cta: Cta;
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

export interface ComponentDefaultValues {
    header: Header;
    usps: Usps;
}

export type ComponentKey = keyof ComponentDefaultValues;

export type SelectorComponentKey = 'header' | 'usps';
export const selectorComponentKeys = ['header', 'usps'] as const;

export type SelectorComponentKeyType = typeof selectorComponentKeys[number];
