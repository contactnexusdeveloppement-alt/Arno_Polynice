'use client';

import Link from 'next/link';
import { useCookieConsent } from '@/context/CookieConsentContext';
import { useLanguage } from '@/context/LanguageContext';
import styles from './CookieBanner.module.css';

/**
 * Bannière de consentement cookies (RGPD).
 *
 * Affichée uniquement si :
 *   - Le state du context est 'pending' (utilisateur n'a pas encore choisi)
 *   - ET l'hydratation est terminée (évite un flash entre SSR FR et client EN/ES)
 *
 * 2 boutons explicites : Accepter / Refuser. Pas de "X" ni de "Plus tard"
 * (pratique CNIL : le refus doit être aussi visible et accessible que
 * l'acceptation).
 */
export default function CookieBanner() {
    const { consent, accept, reject, isHydrated } = useCookieConsent();
    const { t } = useLanguage();

    if (!isHydrated || consent !== 'pending') return null;

    return (
        <div className={styles.banner} role="dialog" aria-label={t('cookie.title')} aria-live="polite">
            <div className={styles.inner}>
                <div className={styles.content}>
                    <h2 className={styles.title}>{t('cookie.title')}</h2>
                    <p className={styles.text}>
                        {t('cookie.text')}{' '}
                        <Link href="/politique-de-confidentialite" className={styles.link}>
                            {t('cookie.learnMore')}
                        </Link>
                    </p>
                </div>
                <div className={styles.actions}>
                    <button
                        type="button"
                        onClick={reject}
                        className={styles.btnReject}
                        aria-label={t('cookie.reject')}
                    >
                        {t('cookie.reject')}
                    </button>
                    <button
                        type="button"
                        onClick={accept}
                        className={styles.btnAccept}
                        aria-label={t('cookie.accept')}
                    >
                        {t('cookie.accept')}
                    </button>
                </div>
            </div>
        </div>
    );
}
