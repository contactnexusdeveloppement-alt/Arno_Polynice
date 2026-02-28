'use server';

import { cookies } from 'next/headers';
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
}

/**
 * Retrieves the currently logged in customer's data using the cookie
 * Can be called from Server Components
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
