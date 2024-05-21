import { FieldError, UseFormRegister } from "react-hook-form";

export type WaitingListFormData = {
    email: string;
    // Message is used as a Honeypot field to prevent spam
    message: string;
};

export type WaitingListFormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<WaitingListFormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
};


export type ValidFieldNames =
    | "email"