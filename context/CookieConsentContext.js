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

export function CookieConsentProvider({ children }) {
    const [consent, setConsent] = useState('pending');
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored === 'accepted' || stored === 'rejected') {
                setConsent(stored);
            }
        } catch (e) { /* localStorage indisponible (mode privé strict) */ }
        setIsHydrated(true);
    }, []);

    const accept = useCallback(() => {
        setConsent('accepted');
        try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch (e) { }
    }, []);

    const reject = useCallback(() => {
        setConsent('rejected');
        try { localStorage.setItem(STORAGE_KEY, 'rejected'); } catch (e) { }
    }, []);

    const reset = useCallback(() => {
        setConsent('pending');
        try { localStorage.removeItem(STORAGE_KEY); } catch (e) { }
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
