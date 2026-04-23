'use client';

import { useState, useMemo, useRef, useLayoutEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/context/LanguageContext';
import styles from './AccessoriesContent.module.css';

/**
 * Page Accessoires : 3 onglets Femme/Homme/Unisexe avec un curseur underline
 * qui glisse entre les options. Filtrage instantané (pas de rechargement).
 *
 * Les produits doivent être taggés `femme`/`homme`/`unisexe` côté Shopify
 * et avoir le product type "Accessoires" (ou la subcategory "Accessoires"
 * via le mapping data/products.js).
 */

const TABS = [
    { id: 'femme', i18nKey: 'categories.femme' },
    { id: 'homme', i18nKey: 'categories.homme' },
    { id: 'unisexe', i18nKey: 'categories.unisexe' },
];

export default function AccessoriesContent({ products }) {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('femme');

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

    const filtered = useMemo(
        () => products.filter(p => p.category === activeTab),
        [products, activeTab]
    );

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
