'use client';

import { logoutAction } from '@/app/actions/auth';

export default function LogoutButton({ className }) {
    const handleLogout = async () => {
        // Clear client-side cart state before server logout so next user
        // doesn't see previous customer's cart
        try {
            localStorage.removeItem('arno-cart');
        } catch (e) { /* ignore */ }
        await logoutAction();
    };

    return (
        <form action={handleLogout}>
            <button type="submit" className={className}>Se déconnecter</button>
        </form>
    );
}
