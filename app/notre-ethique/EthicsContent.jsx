'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

/**
 * Page Notre Éthique — contenu rendu côté client à partir des locales.
 *
 * Architecture : on a abandonné le contenu via Shopify metaobjects
 * (ethics_page + ethics_value) au profit des locales pour deux raisons :
 *   1) Adelson saisissait son contenu uniquement en FR → les utilisateurs
 *      EN et ES voyaient du français. La fonction Shopify `@inContext` ne
 *      résout pas le problème (elle nécessite que le contenu soit
 *      explicitement traduit côté Shopify via l'app Translate & Adapt,
 *      donc une re-saisie manuelle pour chaque langue).
 *   2) Le contenu de cette page est très stable (4 valeurs + un crédo) →
 *      perdre le CMS Shopify pour cette page est un compromis acceptable.
 *
 * Si Adelson souhaite modifier le contenu de cette page, il faut éditer
 * locales/{fr,en,es}.json dans la clé "ethics" (cf. NEXUS DEVELOPPEMENT).
 */

const VALUES = [
    { number: '01', titleKey: 'ethics.value1Title', textKey: 'ethics.value1Text' },
    { number: '02', titleKey: 'ethics.value2Title', textKey: 'ethics.value2Text' },
    { number: '03', titleKey: 'ethics.value3Title', textKey: 'ethics.value3Text' },
    { number: '04', titleKey: 'ethics.value4Title', textKey: 'ethics.value4Text' },
];

export default function EthicsContent() {
    const { t } = useLanguage();

    return (
        <div className="page-enter">
            <section className={styles.ethicsPage}>
                <div className={styles.header}>
                    <span className={styles.label}>{t('ethics.label')}</span>
                    <h1 className={styles.title}>{t('ethics.title')}</h1>
                    <p className={styles.intro}>{t('ethics.intro')}</p>
                </div>

                <div className={styles.values}>
                    {VALUES.map((value) => (
                        <div key={value.number} className={styles.value}>
                            <span className={styles.valueNumber} aria-hidden="true">{value.number}</span>
                            <h2 className={styles.valueTitle}>{t(value.titleKey)}</h2>
                            <p className={styles.valueText}>{t(value.textKey)}</p>
                        </div>
                    ))}
                </div>

                {/* Citation pleine largeur */}
                <div className={styles.quote}>
                    <blockquote className={styles.quoteText}>
                        « {t('ethics.quoteText')} »
                    </blockquote>
                    <cite className={styles.quoteAuthor}>— {t('ethics.quoteAuthor')}</cite>
                </div>
            </section>
        </div>
    );
}
