import { setBoldTemplate, setCustomTemplate, setMinimalTemplate, setModernTemplate, setProfessionalTemplate } from "./createTemplate";
import { OpenGraphDefaultValues, Template } from "./types";

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

export const createStyleObject = (settings: any) => {
    switch(settings.template.choice) {
        case Template.Minimal:
            return setMinimalTemplate();
        case Template.Modern:
            return setModernTemplate();
        case Template.Bold:
            return setBoldTemplate();
        case Template.Professional:
            return setProfessionalTemplate();
        case Template.Custom:
            return setCustomTemplate(settings.template.customOptions);
        default:
            return setMinimalTemplate();
    }
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
