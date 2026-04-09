'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

export default function ContactPage() {
    const { t } = useLanguage();
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === 'sending') return;

        setStatus('sending');
        setErrorMessage('');

        const formData = new FormData(e.target);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || 'Erreur lors de l\'envoi');
            }

            setStatus('success');
            e.target.reset();
        } catch (err) {
            setStatus('error');
            setErrorMessage(err.message || 'Une erreur est survenue. Veuillez réessayer.');
        }
    };

    return (
        <div className="page-enter">
            <section className={styles.contactPage}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Contact</h1>
                    <p className={styles.subtitle}>
                        Une question, une commande sur mesure ou une collaboration ? N'hésitez pas à nous écrire.
                    </p>
                </div>

                <div className={styles.grid}>
                    {/* Form */}
                    <form className={styles.form} onSubmit={handleSubmit} noValidate>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="firstName">Prénom</label>
                                <input id="firstName" name="firstName" type="text" className={styles.formInput} placeholder="Votre prénom" required disabled={status === 'sending'} />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="lastName">Nom</label>
                                <input id="lastName" name="lastName" type="text" className={styles.formInput} placeholder="Votre nom" required disabled={status === 'sending'} />
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel} htmlFor="email">Email</label>
                            <input id="email" name="email" type="email" className={styles.formInput} placeholder="votre@email.com" required disabled={status === 'sending'} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel} htmlFor="subject">Sujet</label>
                            <select id="subject" name="subject" className={styles.formInput} defaultValue="" required disabled={status === 'sending'}>
                                <option value="" disabled>Sélectionnez un sujet</option>
                                <option value="commande">Question sur une commande</option>
                                <option value="personnalisation">Personnalisation / Sur mesure</option>
                                <option value="collaboration">Collaboration</option>
                                <option value="presse">Presse</option>
                                <option value="autre">Autre</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel} htmlFor="message">Message</label>
                            <textarea id="message" name="message" className={styles.formTextarea} rows="6" placeholder="Votre message..." required disabled={status === 'sending'} />
                        </div>

                        {status === 'success' && (
                            <div className={styles.successBanner} role="status" aria-live="polite">
                                ✓ Votre message a bien été envoyé. Nous vous répondrons sous 24 à 48 heures.
                            </div>
                        )}
                        {status === 'error' && (
                            <div className={styles.errorBanner} role="alert" aria-live="polite">
                                {errorMessage}
                            </div>
                        )}

                        <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
                            {status === 'sending' ? 'Envoi en cours...' : 'Envoyer'}
                        </button>
                    </form>

                    {/* Info */}
                    <div className={styles.contactInfo}>
                        <div className={styles.infoBlock}>
                            <h3 className={styles.infoTitle}>Email</h3>
                            <a href="mailto:arnopolynice@gmail.com" className={styles.infoLink}>
                                arnopolynice@gmail.com
                            </a>
                        </div>

                        <div className={styles.infoBlock}>
                            <h3 className={styles.infoTitle}>Réseaux sociaux</h3>
                            <a href="https://www.instagram.com/arno.polynice.__" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                                Instagram — @arno.polynice.__
                            </a>
                            <a href="https://www.tiktok.com/@arnopolynice" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                                TikTok — @arnopolynice
                            </a>
                            <a href="https://www.facebook.com/Arno.Polynice" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                                Facebook — Arno Polynice
                            </a>
                            <a href="https://www.youtube.com/@AdelsonPaugain" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                                YouTube — Adelson Paugain
                            </a>
                        </div>

                        <div className={styles.infoBlock}>
                            <h3 className={styles.infoTitle}>Délais de réponse</h3>
                            <p className={styles.infoText}>
                                Nous répondons généralement sous 24 à 48 heures.
                                Pour les commandes personnalisées, un rendez-vous atelier peut être organisé.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
