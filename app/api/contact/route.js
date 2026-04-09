import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'arnopolynice@gmail.com';

// Basic email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
    if (!RESEND_API_KEY) {
        return NextResponse.json(
            { error: 'Service d\'envoi non configuré. Merci de contacter directement arnopolynice@gmail.com.' },
            { status: 503 }
        );
    }

    try {
        const body = await req.json();
        const { firstName, lastName, email, subject, message } = body;

        // Server-side validation
        if (!firstName || !lastName || !email || !subject || !message) {
            return NextResponse.json({ error: 'Tous les champs sont obligatoires.' }, { status: 400 });
        }

        if (!EMAIL_REGEX.test(email)) {
            return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 });
        }

        if (message.length < 10) {
            return NextResponse.json({ error: 'Votre message est trop court (10 caractères minimum).' }, { status: 400 });
        }

        if (message.length > 5000) {
            return NextResponse.json({ error: 'Votre message est trop long (5000 caractères maximum).' }, { status: 400 });
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
            return NextResponse.json({ error: 'Impossible d\'envoyer le message. Veuillez réessayer plus tard.' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Contact API error:', err);
        return NextResponse.json({ error: 'Erreur serveur. Veuillez réessayer plus tard.' }, { status: 500 });
    }
}
