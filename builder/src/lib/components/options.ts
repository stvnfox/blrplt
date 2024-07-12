export const componentOptions = [
    {
        value: "usps",
        label: "unique selling points",
        disabled: false,
    },
    {
        value: "pricing",
        label: "pricing",
        disabled: true,
    },
    {
        value: "faq",
        label: "frequently asked questions",
        disabled: true,
    },
    {
        value: "content",
        label: "content block",
        disabled: true,
    },
    {
        value: "more",
        label: "many more to come...",
        disabled: true,
    },
]

export type ComponentOption = {
    value: string
    label: string
    disabled: boolean
}