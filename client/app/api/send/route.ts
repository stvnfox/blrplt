import { Resend } from 'resend';

import { WaitingListWelcomeTemplate } from "@/emails/waiting-list-welcome";
import { loadWaitingList } from '@/sanity/loader/loadQuery';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    const { data } = await loadWaitingList();
    const fromEmail = data?.email?.fromEmail ?? '';
    const subject = data?.email?.subject ?? '';

    try {
        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: ['delivered@resend.dev'],
            subject: subject,
            react: WaitingListWelcomeTemplate(),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
