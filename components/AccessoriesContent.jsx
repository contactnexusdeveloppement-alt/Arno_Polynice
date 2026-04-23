'use client';

import { useState, useMemo, useRef, useLayoutEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/context/LanguageContext';
import styles from './AccessoriesContent.module.css';

/**
 * Page Accessoires : 2 niveaux de filtre.
 *   1) Switcher principal Femme/Homme/Unisexe avec curseur underline animé
 *   2) Pills sous-catégories (Tous / Sacs / Trousses / Lunettes…) calculées
 *      dynamiquement depuis les `subcategory` (Shopify product type) des
 *      produits du genre actif.
 *
 * Convention Shopify :
 *   - Tag "accessoires" pour identifier la rubrique
 *   - Tag genre : femme / homme / unisexe
 *   - Type de produit : sous-catégorie ("Sacs", "Trousses", "Lunettes"…)
 */

const TABS = [
    { id: 'femme', i18nKey: 'categories.femme' },
    { id: 'homme', i18nKey: 'categories.homme' },
    { id: 'unisexe', i18nKey: 'categories.unisexe' },
];

const ALL_FILTER = '__all__';

export default function AccessoriesContent({ products }) {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('femme');
    const [activeSubcategory, setActiveSubcategory] = useState(ALL_FILTER);

    // Refs sur chaque bouton pour positionner le curseur underline avec la bonne largeur
    const tabRefs = useRef({});
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });

    // Recalcule la position du curseur dès que la langue change (largeur des labels)
    // ou que l'onglet actif change. useLayoutEffect évite un flash de positionnement.
    useLayoutEffect(() => {
        const node = tabRefs.current[activeTab];
        if (!node) return;
        setIndicator({ left: node.offsetLeft, width: node.offsetWidth });
    }, [activeTab, t]);

    // Produits du genre actif
    const productsForGender = useMemo(
        () => products.filter(p => p.category === activeTab),
        [products, activeTab]
    );

    // Sous-catégories dispo pour ce genre, classées par fréquence d'apparition
    // (les sous-cats avec le plus de produits viennent en premier).
    const subcategories = useMemo(() => {
        const counts = new Map();
        productsForGender.forEach(p => {
            const sub = (p.subcategory || '').trim();
            // On exclut les libellés génériques qui ne sont pas de vraies sous-cats
            if (!sub || sub.toLowerCase() === 'autre' || sub.toLowerCase() === 'accessoires') return;
            counts.set(sub, (counts.get(sub) || 0) + 1);
        });
        return [...counts.entries()]
            .sort((a, b) => b[1] - a[1])
            .map(([name]) => name);
    }, [productsForGender]);

    // Quand on change de genre, on revient automatiquement sur "Tous" si la
    // sous-cat sélectionnée n'existe pas pour ce nouveau genre.
    useLayoutEffect(() => {
        if (activeSubcategory !== ALL_FILTER && !subcategories.includes(activeSubcategory)) {
            setActiveSubcategory(ALL_FILTER);
        }
    }, [activeSubcategory, subcategories]);

    // Filtre final : genre + sous-catégorie
    const filtered = useMemo(() => {
        if (activeSubcategory === ALL_FILTER) return productsForGender;
        return productsForGender.filter(p => p.subcategory === activeSubcategory);
    }, [productsForGender, activeSubcategory]);

    return (
        <div className="page-enter">
            <section className={styles.pageHeader}>
                <h1 className={styles.title}>{t('accessories.title')}</h1>
                <p className={styles.intro}>{t('accessories.intro')}</p>
            </section>

            {/* Switcher 3 onglets — curseur underline animé */}
            <div className={styles.switcherWrapper}>
                <div className={styles.switcher} role="tablist" aria-label={t('accessories.filterLabel')}>
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            ref={el => { tabRefs.current[tab.id] = el; }}
                            role="tab"
                            aria-selected={activeTab === tab.id}
                            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {t(tab.i18nKey)}
                        </button>
                    ))}
                    <span
                        className={styles.indicator}
                        aria-hidden="true"
                        style={{ left: indicator.left, width: indicator.width }}
                    />
                </div>

                {/* Sous-filtres : pills (Tous / Sacs / Trousses / Lunettes…).
                    Affichés seulement si au moins une sous-catégorie existe. */}
                {subcategories.length > 0 && (
                    <div className={styles.subFilters} role="group" aria-label={t('accessories.subFilterLabel')}>
                        <button
                            type="button"
                            className={`${styles.subFilter} ${activeSubcategory === ALL_FILTER ? styles.subFilterActive : ''}`}
                            onClick={() => setActiveSubcategory(ALL_FILTER)}
                            aria-pressed={activeSubcategory === ALL_FILTER}
                        >
                            {t('accessories.subFilterAll')}
                        </button>
                        {subcategories.map(sub => (
                            <button
                                key={sub}
                                type="button"
                                className={`${styles.subFilter} ${activeSubcategory === sub ? styles.subFilterActive : ''}`}
                                onClick={() => setActiveSubcategory(sub)}
                                aria-pressed={activeSubcategory === sub}
                            >
                                {sub}
                            </button>
                        ))}
                    </div>
                )}

                <p className={styles.count}>
                    {filtered.length} {filtered.length > 1 ? t('categories.creations') : t('categories.creation')}
                </p>
            </div>

            <section className="section--compact">
                <div className="container">
                    <div className="product-grid">
                        {filtered.map(product => (
                            <ProductCard key={product.id} product={product} showPrice={false} />
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <p className={styles.noProducts}>
                            {t('accessories.noProductsForGender')}
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
}
