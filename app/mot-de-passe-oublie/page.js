'use client';

import { useState } from 'react';
import Link from 'next/link';
import { recoverAction } from '@/app/actions/auth';
import styles from '@/app/connexion/page.module.css';

export default function ForgotPasswordPage() {
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
            setError(result.error);
        } else {
            setSuccessMessage("Si cet email correspond à un compte, vous recevrez bientôt un lien pour réinitialiser le mot de passe.");
        }
        setIsLoading(false);
    }

    return (
        <div className={`page-enter ${styles.authPage}`}>
            <div className={styles.authContainer}>
                <h1 className={styles.title}>Oubli de Code</h1>
                <p className={styles.subtitle}>Saisissez votre email. Nous vous enverrons un lien de réinitialisation.</p>

                {error && <div className={styles.errorBanner} role="alert" aria-live="polite">{error}</div>}

                {successMessage ? (
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <p style={{ color: 'var(--color-success, #2e7d32)', fontSize: '0.85rem', marginBottom: '24px', lineHeight: 1.5 }}>
                            {successMessage}
                        </p>
                        <Link href="/connexion" className={`btn btn--primary ${styles.submitBtn}`} style={{ display: 'inline-block', width: 'auto' }}>
                            Retour à la connexion
                        </Link>
                    </div>
                ) : (
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="vous@exemple.com"
                            />
                        </div>

                        <button
                            type="submit"
                            className={`btn btn--primary ${styles.submitBtn}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Envoi en cours...' : 'Envoyer le lien'}
                        </button>
                    </form>
                )}

                <div className={styles.switchAuth} style={{ borderTop: successMessage ? 'none' : '' }}>
                    <p>Je me souviens de mon mot de passe. <Link href="/connexion" className={styles.linkBold}>Se connecter</Link></p>
                </div>
            </div>
        </div>
    );
}
