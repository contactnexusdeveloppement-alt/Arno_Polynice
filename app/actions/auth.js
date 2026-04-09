'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { customerAccessTokenCreate, customerCreate, getCustomer } from '@/lib/shopifyAuth';

const TOKEN_COOKIE_NAME = 'shopify_customer_token';

/**
 * Handles user login and sets the session cookie
 */
export async function loginAction(prevState, formData) {
    try {
        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || !password) {
            return { error: 'Veuillez remplir tous les champs.' };
        }

        // Call Shopify API
        const tokenData = await customerAccessTokenCreate({ email, password });

        // Set secure HTTP-only cookie
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
        return { error: error.message || 'Identifiants invalides.' };
    }
}

/**
 * Handles user registration, then logs them in
 */
export async function registerAction(prevState, formData) {
    try {
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const password = formData.get('password');

        if (!firstName || !lastName || !email || !password) {
            return { error: 'Veuillez remplir tous les champs.' };
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return { error: 'Adresse email invalide.' };
        }

        if (password.length < 8) {
            return { error: 'Le mot de passe doit contenir au moins 8 caractères.' };
        }

        // 1. Create account on Shopify
        await customerCreate({ firstName, lastName, email, password });

        // 2. Automatically log them in after registration
        const tokenData = await customerAccessTokenCreate({ email, password });

        // Set secure HTTP-only cookie
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
        return { error: error.message || "Erreur lors de l'inscription." };
    }
}

/**
 * Logs the user out by deleting the cookie
 */
export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete(TOKEN_COOKIE_NAME);
    redirect('/connexion');
}

/**
 * Retrieve current customer data from session cookie
 */
export async function getSessionCustomer() {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;

    if (!token) return null;

    try {
        const customer = await getCustomer(token);
        return customer;
    } catch (error) {
        // Token might be invalid or expired
        console.error('Session expired or invalid token');
        return null;
    }
}

/**
 * Handle password recovery requests
 */
export async function recoverAction(prevState, formData) {
    try {
        const email = formData.get('email');
        if (!email) {
            return { error: 'Veuillez saisir votre adresse email.' };
        }

        // We import it inside the action to avoid circular dependency issues if any
        const { customerRecover } = await import('@/lib/shopifyAuth');
        await customerRecover(email);

        return { success: true };
    } catch (error) {
        return { error: error.message || "Une erreur est survenue." };
    }
}
