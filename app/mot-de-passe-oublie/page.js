'use client';

import { useState } from 'react';
import Link from 'next/link';
import { recoverAction } from '@/app/actions/auth';
import { useLanguage } from '@/context/LanguageContext';
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

export default function ForgotPasswordPage() {
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        const formData = new FormData(e.currentTarget);
        const result = await recoverAction(null, formData);

        if (result?.error) {
            const key = ERROR_CODE_TO_KEY[result.error] || 'auth.errors.recoveryFailed';
            setError(t(key));
        } else {
            setSuccessMessage(t('auth.successMessage'));
        }
        setIsLoading(false);
    }

    return (
        <div className={`page-enter ${styles.authPage}`}>
            <div className={styles.authContainer}>
                <h1 className={styles.title}>{t('auth.forgotTitle')}</h1>
                <p className={styles.subtitle}>{t('auth.forgotSubtitle')}</p>

                {error && <div className={styles.errorBanner} role="alert" aria-live="polite">{error}</div>}

                {successMessage ? (
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <p style={{ color: 'var(--color-success, #2e7d32)', fontSize: '0.85rem', marginBottom: '24px', lineHeight: 1.5 }}>
                            {successMessage}
                        </p>
                        <Link href="/connexion" className={`btn btn--primary ${styles.submitBtn}`} style={{ display: 'inline-block', width: 'auto' }}>
                            {t('auth.backToLogin')}
                        </Link>
                    </div>
                ) : (
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">{t('auth.email')}</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder={t('auth.emailPlaceholder')}
                            />
                        </div>

                        <button
                            type="submit"
                            className={`btn btn--primary ${styles.submitBtn}`}
                            disabled={isLoading}
                        >
                            {isLoading ? t('auth.sending') : t('auth.sendLink')}
                        </button>
                    </form>
                )}

                <div className={styles.switchAuth} style={{ borderTop: successMessage ? 'none' : '' }}>
                    <p>{t('auth.rememberPassword')} <Link href="/connexion" className={styles.linkBold}>{t('auth.signIn')}</Link></p>
                </div>
            </div>
        </div>
    );
}
