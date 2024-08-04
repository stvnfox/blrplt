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
    headings: "#000000",
    font: {
        style: "sans-serif",
    },
}

export const addDefaultSettingsValues = () => {
    return settingsDefaultValues;
}

export const createDefaultSettingsValues = (defaultValues: SettingsDefaultValues, existingData?: SettingsDefaultValues) => {
    const values: SettingsDefaultValues = defaultValues;
    
    Object.keys(defaultValues).forEach((key) => {
        const settingKey = key as keyof SettingsDefaultValues;
        
        if(settingKey === 'font' || settingKey === 'background' || settingKey === 'text') {
            // @ts-expect-error because of different otions in in styling
            values[settingKey] = {
                ...defaultValues[settingKey] as Record<string, any>,
                ...(existingData?.[settingKey] as Record<string, any> ?? {}),
            };
        } else {
            values[settingKey] = existingData?.[settingKey] ?? defaultValues[settingKey];
        }
    });
    
    return values
}
