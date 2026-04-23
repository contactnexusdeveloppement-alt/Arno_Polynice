'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './PasswordInput.module.css';

/**
 * Champ mot de passe avec bouton œil pour afficher/masquer.
 * Réutilisable dans /connexion, /inscription et partout où on demande un password.
 *
 * Props (toutes optionnelles sauf id/name) :
 *   id, name, required, minLength, placeholder, autoComplete, defaultValue
 *   Le state "visible" est local : chaque instance est indépendante.
 */
export default function PasswordInput({
    id,
    name,
    required = false,
    minLength,
    placeholder,
    autoComplete = 'current-password',
    defaultValue,
    className = '',
}) {
    const { t } = useLanguage();
    const [visible, setVisible] = useState(false);

    return (
        <div className={`${styles.wrapper} ${className}`}>
            <input
                type={visible ? 'text' : 'password'}
                id={id}
                name={name}
                required={required}
                minLength={minLength}
                placeholder={placeholder}
                autoComplete={autoComplete}
                defaultValue={defaultValue}
                className={styles.input}
            />
            <button
                type="button"
                onClick={() => setVisible(v => !v)}
                className={styles.toggle}
                aria-label={visible ? t('auth.hidePassword') : t('auth.showPassword')}
                aria-pressed={visible}
                tabIndex={-1}
            >
                {visible ? (
                    // Œil barré (mot de passe visible)
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                ) : (
                    // Œil ouvert (mot de passe masqué)
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                )}
            </button>
        </div>
    );
}
