'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { customerAccessTokenCreate, customerCreate, getCustomer } from '@/lib/shopifyAuth';

const TOKEN_COOKIE_NAME = 'shopify_customer_token';

// Codes d'erreur renvoyés au client. Chaque code correspond à une clé i18n
// dans locales/*.json → `auth.errors.<code>`. On NE met PAS de message en
// français ici : c'est le composant client qui traduit via t().
const AUTH_ERRORS = {
    MISSING_FIELDS: 'missingFields',
    INVALID_EMAIL: 'invalidEmail',
    PASSWORD_TOO_SHORT: 'passwordTooShort',
    INVALID_CREDENTIALS: 'invalidCredentials',
    REGISTRATION_FAILED: 'registrationFailed',
    RECOVERY_FAILED: 'recoveryFailed',
    EMAIL_REQUIRED: 'emailRequired',
};

/**
 * Handles user login and sets the session cookie.
 * Retourne un code d'erreur (jamais un message en dur).
 */
export async function loginAction(prevState, formData) {
    try {
        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || !password) {
            return { error: AUTH_ERRORS.MISSING_FIELDS };
        }

        const tokenData = await customerAccessTokenCreate({ email, password });

        const cookieStore = await cookies();
        cookieStore.set(TOKEN_COOKIE_NAME, tokenData.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            expires: new Date(tokenData.expiresAt),
        });

        return { success: true };
    } catch (error) {
        console.error('[loginAction] Error:', error.message);
        return { error: AUTH_ERRORS.INVALID_CREDENTIALS };
    }
}

/**
 * Handles user registration, then logs them in.
 */
export async function registerAction(prevState, formData) {
    try {
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const password = formData.get('password');

        if (!firstName || !lastName || !email || !password) {
            return { error: AUTH_ERRORS.MISSING_FIELDS };
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return { error: AUTH_ERRORS.INVALID_EMAIL };
        }

        if (password.length < 8) {
            return { error: AUTH_ERRORS.PASSWORD_TOO_SHORT };
        }

        await customerCreate({ firstName, lastName, email, password });

        const tokenData = await customerAccessTokenCreate({ email, password });

        const cookieStore = await cookies();
        cookieStore.set(TOKEN_COOKIE_NAME, tokenData.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            expires: new Date(tokenData.expiresAt),
        });

        return { success: true };
    } catch (error) {
        console.error('[registerAction] Error:', error.message);
        return { error: AUTH_ERRORS.REGISTRATION_FAILED };
    }
}

/**
 * Logs the user out by deleting the cookie.
 */
export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete(TOKEN_COOKIE_NAME);
    redirect('/connexion');
}

/**
 * Retrieve current customer data from session cookie.
 */
export async function getSessionCustomer() {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;

    if (!token) return null;

    try {
        const customer = await getCustomer(token);
        return customer;
    } catch (error) {
        console.error('Session expired or invalid token');
        return null;
    }
}

/**
 * Handle password recovery requests.
 */
export async function recoverAction(prevState, formData) {
    try {
        const email = formData.get('email');
        if (!email) {
            return { error: AUTH_ERRORS.EMAIL_REQUIRED };
        }

        const { customerRecover } = await import('@/lib/shopifyAuth');
        await customerRecover(email);

        return { success: true };
    } catch (error) {
        console.error('[recoverAction] Error:', error.message);
        return { error: AUTH_ERRORS.RECOVERY_FAILED };
    }
}
