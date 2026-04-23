'use client';

import { logoutAction } from '@/app/actions/auth';
import { useLanguage } from '@/context/LanguageContext';

export default function LogoutButton({ className }) {
    const { t } = useLanguage();

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
            <button type="submit" className={className}>{t('auth.logout')}</button>
        </form>
    );
}
