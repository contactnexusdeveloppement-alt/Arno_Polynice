'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

import fr from '@/locales/fr.json';
import en from '@/locales/en.json';
import es from '@/locales/es.json';

const translations = { fr, en, es };
const STORAGE_KEY = 'arno-lang';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguageState] = useState('fr');

    // Load saved language from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved && translations[saved]) {
                setLanguageState(saved);
            }
        } catch (e) { /* ignore */ }
    }, []);

    const setLanguage = useCallback((lang) => {
        if (translations[lang]) {
            setLanguageState(lang);
            try {
                localStorage.setItem(STORAGE_KEY, lang);
            } catch (e) { /* ignore */ }
            // Update html lang attribute
            document.documentElement.lang = lang;
        }
    }, []);

    // Translation function: t('nav.femme') => "Women" (if language is 'en')
    const t = useCallback((key) => {
        const keys = key.split('.');
        let value = translations[language];
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key; // Fallback: return the key itself
            }
        }
        return value || key;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within LanguageProvider');
    return context;
}
