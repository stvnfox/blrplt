import { SettingsDefaultValues } from "./types";

export const settingsDefaultValues: SettingsDefaultValues = {
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
    }
}

export const addDefaultSettingsValues = () => {
    return settingsDefaultValues;
}

export const createDefaultSettingsValues = (defaultValues: SettingsDefaultValues, existingData?: SettingsDefaultValues) => {
    const values: SettingsDefaultValues = defaultValues;
    
    Object.keys(defaultValues).forEach((key) => {
        const settingKey = key as keyof SettingsDefaultValues;
        
        // @ts-expect-error because of different otions in in styling
        values[settingKey] = {
            ...defaultValues[settingKey] as Record<string, any>,
            ...(existingData?.[settingKey] as Record<string, any> ?? {}),
        };

        // Leave this for now, as it is not clear how to handle the different options in styling
        // if(settingKey === 'font' || settingKey === 'background' || settingKey === 'text') {
        //     // @ts-expect-error because of different otions in in styling
        //     values[settingKey] = {
        //         ...defaultValues[settingKey] as Record<string, any>,
        //         ...(existingData?.[settingKey] as Record<string, any> ?? {}),
        //     };
        // } else {
        //     values[settingKey] = existingData?.[settingKey] ?? defaultValues[settingKey];
        // }
    });
    
    return values
}

export const createStyleObject = (settings: any) => {
    return `
        :root {
            --background-primary: ${settings.background.primary};
            --background-secondary: ${settings.background.secondary};
            --background-tertiary: ${settings.background.tertiary};
            --text-primary: ${settings.text.primary};
            --text-secondary: ${settings.text.secondary};
            --text-tertiary: ${settings.text.tertiary};
            --headings-primary: ${settings.headings.primary};
            --headings-secondary: ${settings.headings.secondary};
            --font-style: ${settings.font.style};
            --buttons-primary-background: ${settings.buttons.primary.background};
            --buttons-primary-text: ${settings.buttons.primary.text};
            --buttons-secondary-background: ${settings.buttons.secondary.background};
            --buttons-secondary-text: ${settings.buttons.secondary.text};
            --buttons-style: ${settings.buttons.style};
        }
    `
}
