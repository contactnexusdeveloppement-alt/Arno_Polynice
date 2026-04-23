'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginAction } from '@/app/actions/auth';
import { useLanguage } from '@/context/LanguageContext';
import PasswordInput from '@/components/PasswordInput';
import styles from './page.module.css';

/**
 * Mapping code d'erreur backend → clé i18n.
 * Tout le texte affiché à l'utilisateur passe par t() — jamais de chaîne
 * en dur côté server action.
 */
const ERROR_CODE_TO_KEY = {
    missingFields: 'auth.errors.missingFields',
    invalidEmail: 'auth.errors.invalidEmail',
    passwordTooShort: 'auth.errors.passwordTooShort',
    invalidCredentials: 'auth.errors.invalidCredentials',
    registrationFailed: 'auth.errors.registrationFailed',
    recoveryFailed: 'auth.errors.recoveryFailed',
    emailRequired: 'auth.errors.emailRequired',
};

export default function LoginPage() {
    const router = useRouter();
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const result = await loginAction(null, formData);

        if (result?.error) {
            const key = ERROR_CODE_TO_KEY[result.error] || 'auth.errors.invalidCredentials';
            setError(t(key));
            setIsLoading(false);
        } else {
            router.push('/compte');
            router.refresh();
        }
    }

    return (
        <div className={`page-enter ${styles.authPage}`}>
            <div className={styles.authContainer}>
                <h1 className={styles.title}>{t('auth.login')}</h1>
                <p className={styles.subtitle}>{t('auth.loginSubtitle')}</p>

                {error && <div className={styles.errorBanner} role="alert" aria-live="polite">{error}</div>}

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">{t('auth.email')}</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            autoComplete="email"
                            placeholder={t('auth.emailPlaceholder')}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">{t('auth.password')}</label>
                        <PasswordInput
                            id="password"
                            name="password"
                            required
                            placeholder="••••••••"
                            autoComplete="current-password"
                        />
                    </div>

                    <div className={styles.formLinks}>
                        <Link href="/mot-de-passe-oublie" className={styles.link}>{t('auth.forgotPassword')}</Link>
                    </div>

                    <button
                        type="submit"
                        className={`btn btn--primary ${styles.submitBtn}`}
                        disabled={isLoading}
                    >
                        {isLoading ? t('auth.loginInProgress') : t('auth.loginBtn')}
                    </button>
                </form>

                <div className={styles.switchAuth}>
                    <p>{t('auth.newCustomer')} <Link href="/inscription" className={styles.linkBold}>{t('auth.createAccount')}</Link></p>
                </div>
            </div>
        </div>
    );
}
