import { NextResponse } from 'next/server';
import { getSessionCustomer } from '@/app/actions/auth';

// Endpoint léger pour permettre aux composants clients de connaître
// l'état de session sans exposer le cookie HttpOnly.
// On renvoie uniquement le strict nécessaire pour l'UI (prénom, email),
// jamais le token ni d'infos sensibles.
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const customer = await getSessionCustomer();

        if (!customer) {
            return NextResponse.json({ loggedIn: false }, { status: 200 });
        }

        return NextResponse.json({
            loggedIn: true,
            firstName: customer.firstName || null,
            email: customer.email || null,
        }, { status: 200 });
    } catch (error) {
        // En cas d'erreur de session, on considère l'utilisateur comme non connecté
        // (l'UI affichera l'encart "Se connecter" — fallback safe).
        console.error('[/api/me] Error:', error.message);
        return NextResponse.json({ loggedIn: false }, { status: 200 });
    }
}
