'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginAction } from '@/app/actions/auth';
import styles from './page.module.css';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const result = await loginAction(null, formData);

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
            <div className={styles.authContainer}>
                <h1 className={styles.title}>Connexion</h1>
                <p className={styles.subtitle}>Accédez à votre espace personnel Arno Polynice.</p>

                {error && <div className={styles.errorBanner} role="alert" aria-live="polite">{error}</div>}

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

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <div className={styles.formLinks}>
                        <Link href="/mot-de-passe-oublie" className={styles.link}>Mot de passe oublié ?</Link>
                    </div>

                    <button
                        type="submit"
                        className={`btn btn--primary ${styles.submitBtn}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                    </button>
                </form>

                <div className={styles.switchAuth}>
                    <p>Nouveau client ? <Link href="/inscription" className={styles.linkBold}>Créer un compte</Link></p>
                </div>
            </div>
        </div>
    );
}
