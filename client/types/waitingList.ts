import { PortableTextBlock } from "next-sanity"
import { Image } from "sanity"

export interface IWaitingListForm {
    placeholder: string
    buttonText: string
    successMessage: string
    errorMessageEmailAlreadyExists: string
    errorMessageOther: string
}

export interface IWaitingListSocial {
    socialPlatform: string,
    socialUrl: string
}

export interface IWaitingListEmail {
    fromEmail: string
    subject: string
    logo: Image
    title: string
    content: PortableTextBlock[]
    showSocials: boolean
}