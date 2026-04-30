'use client';

import { useLanguage } from '@/context/LanguageContext';
import PressItem from '@/components/PressItem';
import PressEmpty from '@/components/PressEmpty';
import styles from './page.module.css';

/**
 * Page Presse — wrapper client qui rend l'en-tête depuis les locales
 * et délègue le rendu des items au composant PressItem.
 *
 * Architecture :
 *   - Le SERVEUR (page.js) fetch les items Shopify (metaobject press_item)
 *     avec ISR (revalidate 5 min) et les passe en props ici.
 *   - Le CLIENT (ce composant) gère l'en-tête traduit via t('press.*')
 *     et le footer "Lire l'article" via PressItem.
 *
 * Les items eux-mêmes restent en langue d'origine (mediaName + title +
 * excerpt sont des références à des contenus externes — articles de presse,
 * généralement en français car la marque est française). Si Adelson souhaite
 * un jour fournir des traductions des items, on ajoutera des champs
 * title_en / title_es / excerpt_en / excerpt_es au metaobject press_item.
 */
export default function PresseContent({ items }) {
    const { t } = useLanguage();

    return (
        <div className="page-enter">
            <section className={styles.pressPage}>
                <div className={styles.header}>
                    <span className={styles.label}>{t('press.label')}</span>
                    <h1 className={styles.title}>{t('press.title')}</h1>
                    <p className={styles.intro}>{t('press.intro')}</p>
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
