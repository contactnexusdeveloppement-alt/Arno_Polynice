'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import PressItem from '@/components/PressItem';
import PressEmpty from '@/components/PressEmpty';
import styles from './page.module.css';

/**
 * Page Presse — wrapper client.
 *
 * Architecture identique à EthicsContent :
 *   - Le SERVEUR (page.js) fetch header + items en FR depuis Shopify
 *     metaobjects (press_page + press_item) avec ISR 5 min, et passe le
 *     tout en props ici.
 *   - Le CLIENT (ce composant) détecte la langue active via useLanguage().
 *     Si la langue ≠ 'fr', il re-fetch via /api/press?lang=X qui appelle
 *     les mêmes fonctions Shopify avec la directive @inContext(language: X).
 *
 * Pré-requis pour que la traduction marche en EN / ES :
 *   1. Adelson installe l'app Shopify GRATUITE "Translate & Adapt"
 *      (https://apps.shopify.com/translate-and-adapt — éditeur officiel Shopify)
 *   2. Adelson ouvre Translate & Adapt → sélectionne EN puis ES
 *   3. Adelson traduit chaque champ des metaobjects press_page + press_item
 *      (label, title, intro côté press_page ; media_name, title, excerpt
 *      côté press_item)
 *   4. Le code se synchronise automatiquement via ISR (5 min max)
 *
 * Si Adelson n'a pas encore traduit un champ, Shopify renvoie le contenu FR
 * par défaut (comportement gracieux).
 */
export default function PresseContent({ initialPage, initialItems }) {
    const { language } = useLanguage();
    const [page, setPage] = useState(initialPage);
    const [items, setItems] = useState(initialItems);

    useEffect(() => {
        if (language === 'fr') {
            setPage(initialPage);
            setItems(initialItems);
            return;
        }

        let cancelled = false;
        fetch(`/api/press?lang=${language}`)
            .then((r) => {
                if (!r.ok) throw new Error('API error ' + r.status);
                return r.json();
            })
            .then((data) => {
                if (cancelled) return;
                if (data.page) setPage(data.page);
                if (Array.isArray(data.items)) setItems(data.items);
            })
            .catch((err) => {
                console.error('[PresseContent] Translation fetch failed, keeping FR:', err.message);
            });

        return () => {
            cancelled = true;
        };
    }, [language, initialPage, initialItems]);

    return (
        <div className="page-enter">
            <section className={styles.pressPage}>
                <div className={styles.header}>
                    {page.label && <span className={styles.label}>{page.label}</span>}
                    <h1 className={styles.title}>{page.title}</h1>
                    {page.intro && <p className={styles.intro}>{page.intro}</p>}
                </div>

                {items.length > 0 ? (
                    <div className={styles.itemsList}>
                        {items.map((item, index) => (
                            <PressItem
                                key={item.id}
                                item={item}
                                reversed={index % 2 === 1}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.empty}>
                        <PressEmpty />
                    </div>
                )}
            </section>
        </div>
    );
}
