import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
    name: 'waitingListEmail',
    title: 'Email',
    description: 'This field holds the content for in the email sended to the client when subscribing.',
    type: 'object',
    options: {
        collapsible: true,
    },
    fields: [
        defineField({
            name: 'fromEmail',
            title: 'From email',
            type: 'string',
            description: 'This field is for the mail address where you want to send the email from.',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'subject',
            title: 'Subject',
            type: 'string',
            description: 'This field is the subject of the email.',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            description: 'Displayed as the logo at the top of the email.',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: "This field is for the title in the email.",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
            // Paragraphs
                defineArrayMember({
                    lists: [],
                    marks: {
                        decorators: [
                            {
                                title: 'Italic',
                                value: 'em',
                            },
                            {
                                title: 'Strong',
                                value: 'strong',
                            },
                        ],
                    },
                    styles: [],
                    type: 'block',
                }),
            ],
            description: "This field is for the content in the email.",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'showSocials',
            title: 'Show socials',
            type: 'boolean',
            description: 'This field is for showing links to your socials in the email. NB: This is only shown when you have filled in the socials.',
        })
    ],
    initialValue: {
        fromEmail: "blrplt <hello@blrplt.dev>",
        subject: "Yeey! You're on the blrplt waiting list! 🚀",
        logo: "",
        title: "Your're on the waitlist!",
        content: "Thank you for showing interest in blrplt! We're really happy to welcome more users gradually. Make sure to watch your inbox and follow us to keep up with everything.",
        showSocials: true,
    },
})