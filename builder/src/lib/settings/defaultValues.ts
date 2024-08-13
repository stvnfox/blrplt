import { OpenGraphDefaultValues, StyleSettingsDefaultValues, Template } from "./types";

// TEMPLATE
export const defaultTemplateSettingValues = {
    template: {
        choice: Template.Minimal,
        customOptions: {
            backgroundColor: "",
            textColor: "",
            primaryColor: "",
            secondaryColor: "",
        },
    },
}

export const addDefaultTemplateSettingsValues = () => {
    return defaultTemplateSettingValues;
}

export const createDefaultTemplateSettingsValues = (defaultValues: typeof defaultTemplateSettingValues, existingData?: typeof defaultTemplateSettingValues) => {
    const values = defaultValues;

    Object.keys(defaultValues).forEach((key) => {
        const settingKey = key as keyof typeof defaultValues;

        if(settingKey === 'template') {
            // @ts-expect-error because of different otions in in styling
            values[settingKey] = {
                ...defaultValues[settingKey] as Record<string, any>,
                ...(existingData?.[settingKey] as Record<string, any> ?? {}),
            };
            return
        }

        values[settingKey] = existingData?.[settingKey] ?? defaultValues[settingKey];
    });
    
    return values
}

//TODO: adjust createStyleObject to template changes
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
