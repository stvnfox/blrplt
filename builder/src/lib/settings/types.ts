export interface Background {
    primary: string;
    secondary: string;
    tertiary: string;
}

export interface Font {
    style: string;
    // todo: do we want to add more font properties?
    // size: FontSize;
}

export interface SettingsDefaultValues {
    background: Background;
    text: string;
    headings: string;
    font: Font;
};