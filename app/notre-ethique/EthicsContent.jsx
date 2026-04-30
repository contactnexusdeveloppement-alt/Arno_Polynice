'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

/**
 * Page Notre Éthique — wrapper client.
 *
 * Architecture (identique au pattern utilisé pour les produits Shopify) :
 *   - Le SERVEUR (page.js) fetch le contenu en FR depuis Shopify metaobjects
 *     (ethics_page + ethics_value) avec ISR 5 min. Il passe ces données en
 *     props ici pour que le rendu initial (SSR) soit déjà en FR — bon pour
 *     le SEO et zéro flash pour les visiteurs FR (la majorité).
 *   - Le CLIENT (ce composant) détecte la langue active via useLanguage().
 *     Si la langue ≠ 'fr', il re-fetch via /api/ethics?lang=X qui appelle
 *     les mêmes fonctions Shopify avec la directive @inContext(language: X).
 *
 * Pré-requis pour que la traduction marche en EN / ES :
 *   1. Adelson installe l'app Shopify GRATUITE "Translate & Adapt"
 *      (https://apps.shopify.com/translate-and-adapt — éditeur officiel Shopify)
 *   2. Adelson ouvre Translate & Adapt → sélectionne EN puis ES
 *   3. Adelson traduit chaque champ des metaobjects ethics_page + ethics_value
 *   4. Le code se synchronise automatiquement via ISR (5 min max)
 *
 * Si Adelson n'a pas encore traduit un champ, Shopify renvoie le contenu FR
 * par défaut (comportement gracieux — pas de breakage UX, juste du FR au lieu
 * du EN/ES sur les champs non traduits).
 */
export default function EthicsContent({ initialPage, initialValues }) {
    const { language } = useLanguage();
    const [page, setPage] = useState(initialPage);
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        // Langue par défaut : on garde le SSR initial sans re-fetch (zéro flash).
        if (language === 'fr') {
            setPage(initialPage);
            setValues(initialValues);
            return;
        }

        let cancelled = false;
        fetch(`/api/ethics?lang=${language}`)
            .then((r) => {
                if (!r.ok) throw new Error('API error ' + r.status);
                return r.json();
            })
            .then((data) => {
                if (cancelled) return;
                if (data.page) setPage(data.page);
                if (data.values?.length) setValues(data.values);
            })
            .catch((err) => {
                console.error('[EthicsContent] Translation fetch failed, keeping FR:', err.message);
                // Sur erreur, on garde l'affichage FR (pas de breakage UX).
            });

        return () => {
            cancelled = true;
        };
    }, [language, initialPage, initialValues]);

    return (
        <div className="page-enter">
            <section className={styles.ethicsPage}>
                <div className={styles.header}>
                    <span className={styles.label}>{page.label}</span>
                    <h1 className={styles.title}>{page.title}</h1>
                    <p className={styles.intro}>{page.intro}</p>
                </div>

                <div className={styles.values}>
                    {values.map((value) => (
                        <div key={value.position || value.number} className={styles.value}>
                            <span className={styles.valueNumber} aria-hidden="true">{value.number}</span>
                            <h2 className={styles.valueTitle}>{value.title}</h2>
                            <p className={styles.valueText}>{value.text}</p>
                        </div>
                    ))}
                </div>

                {/* Citation pleine largeur */}
                <div className={styles.quote}>
                    <blockquote className={styles.quoteText}>
                        « {page.quoteText} »
                    </blockquote>
                    <cite className={styles.quoteAuthor}>— {page.quoteAuthor}</cite>
                </div>
            </section>
        </div>
    );
}
