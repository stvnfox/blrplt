export interface Colors {
    primary: string;
    secondary: string;
    tertiary?: string;
}

export interface Font {
    style: string;
    // todo: do we want to add more font properties?
    // size: FontSize;
}

interface Button {
    background: string;
    text: string;
}

export interface Buttons {
    primary: Button;
    secondary: Button;
    style: "default" | "outline" | "ghost" | "link";
}

export interface SettingsDefaultValues {
    background: Colors;
    text: Colors;
    headings: Colors;
    font: Font;
    buttons: Buttons;
};