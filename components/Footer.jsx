'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Footer.module.css';

const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/arnopolynice/', icon: 'IG' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@arnopolynice', icon: 'TK' },
    { name: 'YouTube', href: 'https://www.youtube.com/@Arno.Polynice', icon: 'YT' },
];

const shopLinks = [
    { key: 'nav.femme', href: '/femme' },
    { key: 'nav.homme', href: '/homme' },
    { key: 'nav.unisexe', href: '/unisexe' },
];

const infoLinks = [
    { key: 'nav.surMesure', href: '/sur-mesure' },
    { key: 'nav.notreHistoire', href: '/notre-histoire' },
    { key: 'nav.notreEthique', href: '/notre-ethique' },
    { key: 'nav.contact', href: '/contact' },
];

export default function Footer() {
    const { t } = useLanguage();
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [errorKey, setErrorKey] = useState('footer.errors.serverError');

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (status === 'sending') return;

        setStatus('sending');

        const formData = new FormData(e.target);

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.get('email'),
                    website: formData.get('website'),
                }),
            });

            const result = await res.json();

            if (!res.ok) {
                setErrorKey(`footer.errors.${result.error}`);
                setStatus('error');
                return;
            }

            setStatus('success');
            e.target.reset();
        } catch {
            setErrorKey('footer.errors.serverError');
            setStatus('error');
        }
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Newsletter */}
                <div className={styles.newsletter}>
                    <h3 className={styles.newsletterTitle}>{t('footer.stayInformed')}</h3>
                    <p className={styles.newsletterText}>
                        {t('footer.newsletterText')}
                    </p>
                    <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
                        <input
                            type="email"
                            name="email"
                            placeholder={t('footer.emailPlaceholder')}
                            className={styles.newsletterInput}
                            aria-label={t('footer.emailPlaceholder')}
                            required
                            disabled={status === 'sending'}
                        />
                        {/* Honeypot anti-bot : invisible pour les humains */}
                        <input
                            type="text"
                            name="website"
                            className={styles.newsletterHoneypot}
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                        />
                        <button
                            type="submit"
                            className={styles.newsletterBtn}
                            aria-label={t('footer.subscribe')}
                            disabled={status === 'sending'}
                        >
                            →
                        </button>
                    </form>
                    {status === 'success' && (
                        <p className={`${styles.newsletterMessage} ${styles.newsletterSuccess}`} role="status" aria-live="polite">
                            {t('footer.subscribeSuccess')}
                        </p>
                    )}
                    {status === 'error' && (
                        <p className={`${styles.newsletterMessage} ${styles.newsletterError}`} role="alert" aria-live="polite">
                            {t(errorKey)}
                        </p>
                    )}
                </div>

                {/* Links Grid */}
                <div className={styles.linksGrid}>
                    <div className={styles.linkColumn}>
                        <h4 className={styles.columnTitle}>{t('footer.shop')}</h4>
                        {shopLinks.map(link => (
                            <Link key={link.href} href={link.href} className={styles.link}>
                                {t(link.key)}
                            </Link>
                        ))}
                    </div>

                    <div className={styles.linkColumn}>
                        <h4 className={styles.columnTitle}>{t('footer.info')}</h4>
                        {infoLinks.map(link => (
                            <Link key={link.href} href={link.href} className={styles.link}>
                                {t(link.key)}
                            </Link>
                        ))}
                    </div>

                    <div className={styles.linkColumn}>
                        <h4 className={styles.columnTitle}>{t('footer.followUs')}</h4>
                        {socialLinks.map(social => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.link}
                            >
                                {social.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom */}
                <div className={styles.bottom}>
                    <div className={styles.bottomLogo}>
                        <span>ARNO</span>
                        <span>POLYNICE</span>
                    </div>
                    <div className={styles.copyrightAndCredit}>
                        <p className={styles.copyright}>
                            © {new Date().getFullYear()} Arno Polynice. {t('footer.allRights')}
                        </p>
                        <p className={styles.credit}>
                            {t('footer.createdBy')} <a href="https://nexusdeveloppement.fr" target="_blank" rel="noopener noreferrer">Nexus Developpement</a>
                        </p>
                    </div>
                    <div className={styles.bottomLinks}>
                        <Link href="/mentions-legales">{t('footer.legalNotice')}</Link>
                        <Link href="/cgv">{t('footer.cgv')}</Link>
                        <Link href="/politique-de-confidentialite">{t('footer.privacyPolicy')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
