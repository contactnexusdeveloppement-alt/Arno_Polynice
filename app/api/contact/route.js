import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'arnopolynice@gmail.com';

// Basic email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Codes d'erreur retournés au client. Chaque code correspond à une clé i18n
// (contact.errors.<code>). Aucun message en français en dur ici.
const CONTACT_ERRORS = {
    SERVICE_DOWN: 'serviceDown',
    ALL_FIELDS_REQUIRED: 'allFieldsRequired',
    INVALID_EMAIL: 'invalidEmail',
    MESSAGE_TOO_SHORT: 'messageTooShort',
    MESSAGE_TOO_LONG: 'messageTooLong',
    SEND_FAILED: 'sendFailed',
    SERVER_ERROR: 'serverError',
};

export async function POST(req) {
    if (!RESEND_API_KEY) {
        return NextResponse.json(
            { error: CONTACT_ERRORS.SERVICE_DOWN },
            { status: 503 }
        );
    }

    try {
        const body = await req.json();
        const { firstName, lastName, email, subject, message } = body;

        if (!firstName || !lastName || !email || !subject || !message) {
            return NextResponse.json({ error: CONTACT_ERRORS.ALL_FIELDS_REQUIRED }, { status: 400 });
        }

        if (!EMAIL_REGEX.test(email)) {
            return NextResponse.json({ error: CONTACT_ERRORS.INVALID_EMAIL }, { status: 400 });
        }

        if (message.length < 10) {
            return NextResponse.json({ error: CONTACT_ERRORS.MESSAGE_TOO_SHORT }, { status: 400 });
        }

        if (message.length > 5000) {
            return NextResponse.json({ error: CONTACT_ERRORS.MESSAGE_TOO_LONG }, { status: 400 });
        }

        const subjectLabels = {
            commande: 'Question sur une commande',
            personnalisation: 'Personnalisation / Sur mesure',
            collaboration: 'Collaboration',
            presse: 'Presse',
            autre: 'Autre',
        };

        const resend = new Resend(RESEND_API_KEY);

        const { error } = await resend.emails.send({
            from: 'Arno Polynice <onboarding@resend.dev>',
            to: [CONTACT_EMAIL],
            replyTo: email,
            subject: `[Contact arno-polynice.com] ${subjectLabels[subject] || subject}`,
            text: `Nouveau message depuis le formulaire de contact du site arno-polynice.com

De : ${firstName} ${lastName}
Email : ${email}
Sujet : ${subjectLabels[subject] || subject}

Message :
${message}
`,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: CONTACT_ERRORS.SEND_FAILED }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Contact API error:', err);
        return NextResponse.json({ error: CONTACT_ERRORS.SERVER_ERROR }, { status: 500 });
    }
}
