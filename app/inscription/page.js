'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerAction } from '@/app/actions/auth';
import { useLanguage } from '@/context/LanguageContext';
import PasswordInput from '@/components/PasswordInput';
import styles from '@/app/connexion/page.module.css';

const ERROR_CODE_TO_KEY = {
    missingFields: 'auth.errors.missingFields',
    invalidEmail: 'auth.errors.invalidEmail',
    passwordTooShort: 'auth.errors.passwordTooShort',
    invalidCredentials: 'auth.errors.invalidCredentials',
    registrationFailed: 'auth.errors.registrationFailed',
    recoveryFailed: 'auth.errors.recoveryFailed',
    emailRequired: 'auth.errors.emailRequired',
};

export default function RegisterPage() {
    const router = useRouter();
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (password !== confirmPassword) {
            setError(t('auth.passwordMismatch'));
            setIsLoading(false);
            return;
        }

        const result = await registerAction(null, formData);

        if (result?.error) {
            const key = ERROR_CODE_TO_KEY[result.error] || 'auth.errors.registrationFailed';
            setError(t(key));
            setIsLoading(false);
        } else {
            router.push('/compte');
            router.refresh();
        }
    }

    return (
        <div className={`page-enter ${styles.authPage}`}>
            <div className={`${styles.authContainer} ${styles.authContainerWide}`}>
                <h1 className={styles.title}>{t('auth.createAccount')}</h1>
                <p className={styles.subtitle}>{t('auth.registerSubtitle')}</p>

                {error && <div className={styles.errorBanner} role="alert" aria-live="polite">{error}</div>}

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="firstName">{t('auth.firstName')}</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                required
                                autoComplete="given-name"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="lastName">{t('auth.lastName')}</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                required
                                autoComplete="family-name"
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email">{t('auth.email')}</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">{t('auth.password')}</label>
                        <PasswordInput
                            id="password"
                            name="password"
                            required
                            minLength={8}
                            autoComplete="new-password"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword">{t('auth.confirmPassword')}</label>
                        <PasswordInput
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            minLength={8}
                            autoComplete="new-password"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`btn btn--primary ${styles.submitBtn}`}
                        disabled={isLoading}
                    >
                        {isLoading ? t('auth.registerInProgress') : t('auth.registerBtn')}
                    </button>
                </form>

                <div className={styles.switchAuth}>
                    <p>{t('auth.alreadyCustomer')} <Link href="/connexion" className={styles.linkBold}>{t('auth.signIn')}</Link></p>
                </div>
            </div>
        </div>
    );
}
