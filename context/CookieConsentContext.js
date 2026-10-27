'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'arno-cookie-consent';

/**
 * États possibles :
 *   - 'pending'  : utilisateur n'a pas encore choisi → bannière affichée,
 *                  AUCUN cookie analytics chargé
 *   - 'accepted' : utilisateur a accepté → Clarity + GA4 chargés
 *   - 'rejected' : utilisateur a refusé → AUCUN cookie analytics chargé
 *
 * Persistance : localStorage (clé `arno-cookie-consent`).
 *
 * Note RGPD : par défaut on est en 'pending' (équivaut à un refus tant
 * que l'utilisateur n'a pas explicitement accepté). Cela respecte le
 * principe de consentement préalable de la CNIL.
 */
const CookieConsentContext = createContext();

// Cookies déposés par GA4 (_ga, _ga_<id>, _gid) et Clarity (_clck, _clsk).
const ANALYTICS_COOKIE_PATTERN = /^(_ga|_gid|_clck|_clsk)/;

/**
 * Supprime les cookies analytics existants (retrait du consentement, exigé
 * par la CNIL). GA4 les pose sur le domaine racine (.arno-polynice.com),
 * d'où la suppression sur chaque niveau de domaine.
 */
function clearAnalyticsCookies() {
    const hostParts = window.location.hostname.split('.');
    const domains = [''];
    for (let i = 0; i < hostParts.length - 1; i++) {
        domains.push(`; domain=.${hostParts.slice(i).join('.')}`);
    }
    document.cookie.split(';').forEach(cookie => {
        const name = cookie.split('=')[0].trim();
        if (!ANALYTICS_COOKIE_PATTERN.test(name)) return;
        domains.forEach(domain => {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
        });
    });
}

export function CookieConsentProvider({ children }) {
    const [consent, setConsent] = useState('pending');
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored === 'accepted' || stored === 'rejected') {
                setConsent(stored);
            }
            // GA4 réécrit ses cookies au déchargement de la page : on refait
            // le ménage au chargement suivant tant que le choix est « refusé ».
            if (stored === 'rejected') clearAnalyticsCookies();
        } catch (e) { /* localStorage indisponible (mode privé strict) */ }
        setIsHydrated(true);
    }, []);

    const accept = useCallback(() => {
        setConsent('accepted');
        try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch (e) { }
    }, []);

    const reject = useCallback(() => {
        let wasAccepted = false;
        try {
            wasAccepted = localStorage.getItem(STORAGE_KEY) === 'accepted';
            localStorage.setItem(STORAGE_KEY, 'rejected');
        } catch (e) { }
        setConsent('rejected');

        // Retrait d'un consentement donné plus tôt : les scripts GA4/Clarity
        // déjà chargés ne se déchargent pas, on efface leurs cookies puis on
        // recharge la page pour les arrêter.
        if (wasAccepted) {
            clearAnalyticsCookies();
            window.location.reload();
        }
    }, []);

    // Réaffiche la bannière (lien « Gérer les cookies » du footer).
    // Le choix enregistré reste en place tant que le visiteur n'a pas re-choisi.
    const reset = useCallback(() => {
        setConsent('pending');
    }, []);

    return (
        <CookieConsentContext.Provider value={{ consent, accept, reject, reset, isHydrated }}>
            {children}
        </CookieConsentContext.Provider>
    );
}

export function useCookieConsent() {
    const ctx = useContext(CookieConsentContext);
    if (!ctx) throw new Error('useCookieConsent must be used within CookieConsentProvider');
    return ctx;
}
