import { OpenGraphDefaultValues, StyleSettingsDefaultValues } from "./types";

// STYLE
export const styleSettingsDefaultValues: StyleSettingsDefaultValues = {
    background: {
        primary: "#ffffff",
        secondary: "#f9fafb",
        tertiary: "#f4f5f7",
    },
    text: {
        primary: "#000000",
        secondary: "#6b7280",
        tertiary: "#9ca3af",
    },
    headings: {
        primary: "#000000",
        secondary: "#6b7280",
    },
    font: {
        style: "sans-serif",
    },
    buttons: {
        primary: {
            background: "#2563eb",
            text: "#ffffff",
        },
        secondary: {
            background: "#f9fafb",
            text: "#6b7280",
        },
        style: "default",
    },
}

export const addDefaultStyleSettingsValues = () => {
    return styleSettingsDefaultValues;
}

export const createDefaultStyleSettingsValues = (defaultValues: StyleSettingsDefaultValues, existingData?: StyleSettingsDefaultValues) => {
    const values: StyleSettingsDefaultValues = defaultValues;
    
    Object.keys(defaultValues).forEach((key) => {
        const settingKey = key as keyof StyleSettingsDefaultValues;
        
        // @ts-expect-error because of different otions in in styling
        values[settingKey] = {
            ...defaultValues[settingKey] as Record<string, any>,
            ...(existingData?.[settingKey] as Record<string, any> ?? {}),
        };
    });
    
    return values
}

export const createStyleObject = (settings: any) => {
    return `
        :root {
            --background-primary: ${settings.style.background.primary};
            --background-secondary: ${settings.style.background.secondary};
            --background-tertiary: ${settings.style.background.tertiary};
            --text-primary: ${settings.style.text.primary};
            --text-secondary: ${settings.style.text.secondary};
            --text-tertiary: ${settings.style.text.tertiary};
            --headings-primary: ${settings.style.headings.primary};
            --headings-secondary: ${settings.style.headings.secondary};
            --font-style: ${settings.style.font.style};
            --buttons-primary-background: ${settings.style.buttons.primary.background};
            --buttons-primary-text: ${settings.style.buttons.primary.text};
            --buttons-secondary-background: ${settings.style.buttons.secondary.background};
            --buttons-secondary-text: ${settings.style.buttons.secondary.text};
            --buttons-style: ${settings.style.buttons.style};
        }
    `
}

// OPEN GRAPH
export const openGraphDefaultValues = {
    title: "",
    description: "made with blrplt builder",
    type: "website",
    url: "",
    image: {
        url: "",
        extension: "",
        path: "",
    },
}

export const addDefaultOpenGraphValues = () => {
    return openGraphDefaultValues;
}

export const createDefaultOpenGraphValues = (defaultValues: OpenGraphDefaultValues, siteUrl: string, siteName: string, existingData?: OpenGraphDefaultValues) => {
    const values = defaultValues;

    Object.keys(defaultValues).forEach((key) => {
        const settingKey = key as keyof typeof defaultValues;

        if(settingKey === 'image') {
            // @ts-expect-error because of different otions in in styling
            values[settingKey] = {
                ...defaultValues[settingKey] as Record<string, any>,
                ...(existingData?.[settingKey] as Record<string, any> ?? {}),
            };
            return
        }

        if(settingKey === 'url') {
            values[settingKey] = siteUrl;
            return
        }

        if(settingKey === 'title') {
            values[settingKey] = siteName;
            return
        }

        values[settingKey] = existingData?.[settingKey] ?? defaultValues[settingKey];
    });
    
    return values
}
