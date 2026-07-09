import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'arnopolynice@gmail.com';

// Basic email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Codes d'erreur retournés au client. Chaque code correspond à une clé i18n
// (footer.errors.<code>). Aucun message en français en dur ici.
const NEWSLETTER_ERRORS = {
    SERVICE_DOWN: 'serviceDown',
    INVALID_EMAIL: 'invalidEmail',
    SEND_FAILED: 'sendFailed',
    SERVER_ERROR: 'serverError',
};

export async function POST(req) {
    if (!RESEND_API_KEY) {
        return NextResponse.json(
            { error: NEWSLETTER_ERRORS.SERVICE_DOWN },
            { status: 503 }
        );
    }

    try {
        const body = await req.json();
        const { email, website } = body;

        // Honeypot : champ invisible pour les humains. S'il est rempli,
        // c'est un bot — on répond "succès" sans rien envoyer.
        if (website) {
            return NextResponse.json({ success: true });
        }

        if (!email || !EMAIL_REGEX.test(email)) {
            return NextResponse.json({ error: NEWSLETTER_ERRORS.INVALID_EMAIL }, { status: 400 });
        }

        const resend = new Resend(RESEND_API_KEY);

        const { error } = await resend.emails.send({
            from: 'Arno Polynice <onboarding@resend.dev>',
            to: [CONTACT_EMAIL],
            replyTo: email,
            subject: '[Newsletter arno-polynice.com] Nouvelle inscription',
            text: `Nouvelle inscription à la newsletter depuis le site arno-polynice.com

Email : ${email}

Pense à ajouter cette adresse à ta liste de diffusion.
`,
        });

        if (error) {
            console.error('Resend error (newsletter):', error);
            return NextResponse.json({ error: NEWSLETTER_ERRORS.SEND_FAILED }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Newsletter API error:', err);
        return NextResponse.json({ error: NEWSLETTER_ERRORS.SERVER_ERROR }, { status: 500 });
    }
}
