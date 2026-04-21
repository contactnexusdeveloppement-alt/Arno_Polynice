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
                throw new Error(result.error || t('contact.genericError'));
            }

            setStatus('success');
            e.target.reset();
        } catch (err) {
            setStatus('error');
            setErrorMessage(err.message || t('contact.genericError'));
        }
    };

    return (
        <div className="page-enter">
            <section className={styles.contactPage}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{t('contact.title')}</h1>
                    <p className={styles.subtitle}>{t('contact.subtitle')}</p>
                </div>

                <div className={styles.grid}>
                    {/* Form */}
                    <form className={styles.form} onSubmit={handleSubmit} noValidate>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="firstName">{t('contact.firstName')}</label>
                                <input id="firstName" name="firstName" type="text" className={styles.formInput} placeholder={t('contact.firstNamePlaceholder')} required disabled={status === 'sending'} />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="lastName">{t('contact.lastName')}</label>
                                <input id="lastName" name="lastName" type="text" className={styles.formInput} placeholder={t('contact.lastNamePlaceholder')} required disabled={status === 'sending'} />
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel} htmlFor="email">{t('contact.email')}</label>
                            <input id="email" name="email" type="email" className={styles.formInput} placeholder={t('contact.emailPlaceholder')} required disabled={status === 'sending'} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel} htmlFor="subject">{t('contact.subject')}</label>
                            <select id="subject" name="subject" className={styles.formInput} defaultValue="" required disabled={status === 'sending'}>
                                <option value="" disabled>{t('contact.selectSubject')}</option>
                                <option value="commande">{t('contact.subjectOrder')}</option>
                                <option value="personnalisation">{t('contact.subjectCustom')}</option>
                                <option value="collaboration">{t('contact.subjectCollab')}</option>
                                <option value="presse">{t('contact.subjectPress')}</option>
                                <option value="autre">{t('contact.subjectOther')}</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel} htmlFor="message">{t('contact.message')}</label>
                            <textarea id="message" name="message" className={styles.formTextarea} rows="6" placeholder={t('contact.messagePlaceholder')} required disabled={status === 'sending'} />
                        </div>

                        {status === 'success' && (
                            <div className={styles.successBanner} role="status" aria-live="polite">
                                {t('contact.messageSent')}
                            </div>
                        )}
                        {status === 'error' && (
                            <div className={styles.errorBanner} role="alert" aria-live="polite">
                                {errorMessage}
                            </div>
                        )}

                        <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
                            {status === 'sending' ? t('contact.sending') : t('contact.send')}
                        </button>
                    </form>

                    {/* Info */}
                    <div className={styles.contactInfo}>
                        <div className={styles.infoBlock}>
                            <h3 className={styles.infoTitle}>{t('contact.email')}</h3>
                            <a href="mailto:arnopolynice@gmail.com" className={styles.infoLink}>
                                arnopolynice@gmail.com
                            </a>
                        </div>

                        <div className={styles.infoBlock}>
                            <h3 className={styles.infoTitle}>{t('contact.socialNetworks')}</h3>
                            <a href="https://www.instagram.com/arnopolynice/" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                                Instagram — @arnopolynice
                            </a>
                            <a href="https://www.tiktok.com/@arnopolynice" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                                TikTok — @arnopolynice
                            </a>
                            <a href="https://www.youtube.com/@Arno.Polynice" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                                YouTube — Arno Polynice
                            </a>
                        </div>

                        <div className={styles.infoBlock}>
                            <h3 className={styles.infoTitle}>{t('contact.responseTime')}</h3>
                            <p className={styles.infoText}>{t('contact.responseTimeText')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
