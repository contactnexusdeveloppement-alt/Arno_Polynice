'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerAction } from '@/app/actions/auth';
import styles from '@/app/connexion/page.module.css';

export default function RegisterPage() {
    const router = useRouter();
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
            setError('Les mots de passe ne correspondent pas.');
            setIsLoading(false);
            return;
        }

        const result = await registerAction(null, formData);

        if (result?.error) {
            setError(result.error);
            setIsLoading(false);
        } else {
            router.push('/compte');
            router.refresh();
        }
    }

    return (
        <div className={`page-enter ${styles.authPage}`}>
            <div className={styles.authContainer} style={{ maxWidth: '500px' }}>
                <h1 className={styles.title}>Créer un compte</h1>
                <p className={styles.subtitle}>Rejoignez l'univers Arno Polynice.</p>

                {error && <div className={styles.errorBanner}>{error}</div>}

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="firstName">Prénom</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="lastName">Nom</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            minLength={8}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            minLength={8}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`btn btn--primary ${styles.submitBtn}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Création en cours...' : 'S\'inscrire'}
                    </button>
                </form>

                <div className={styles.switchAuth}>
                    <p>Déjà client ? <Link href="/connexion" className={styles.linkBold}>Se connecter</Link></p>
                </div>
            </div>
        </div>
    );
}
