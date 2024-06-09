import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'waitingListForm',
    title: 'Form',
    description: 'This field holds every value for the form.',
    type: 'object',
    options: {
        collapsible: true,
    },
    fields: [
        defineField({
            name: 'placeholder',
            title: 'Placeholder',
            type: 'string',
            description: 'This field is for the placeholder in the input field.',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'buttonText',
            title: 'Button text',
            type: 'string',
            description: 'This field is the text of the button.',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'successMessage',
            title: 'Success message',
            type: 'string',
            description:
                "This field is for the success message that's being showed when the user successfully submitted there email.",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'errorMessageEmailAlreayExists',
            title: 'Error message - Email already exists',
            type: 'string',
            description:
                "This field is for the error message that's being showed when the submit failed because the email is already subscribed.",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'errorMessageOther',
            title: 'Error message - Other',
            type: 'string',
            description:
                "This field is for the error message that's being showed when the submit failed.",
            validation: (rule) => rule.required(),
        }),
    ],
    initialValue: {
        placeholder: 'Enter your email address',
        buttonText: 'Join now!',
        successMessage: "Yeey! You're on the waiting list! 🚀",
        errorMessageAlreayExists: 'This email is already on the waiting list.',
        errorMessageOther: 'Meh.. Something went wrong! Please try again.',
    },
})