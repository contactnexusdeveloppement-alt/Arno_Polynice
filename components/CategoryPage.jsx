'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/context/LanguageContext';
import styles from './CategoryPage.module.css';

export default function CategoryPage({ title, products, subcategories }) {
    const { t } = useLanguage();
    const [activeFilter, setActiveFilter] = useState('all');

    const filters = ['all', ...subcategories];
    const filteredProducts = activeFilter === 'all'
        ? products
        : products.filter(p => p.subcategory === activeFilter);

    const getFilterLabel = (filter) => {
        if (filter === 'all') return t('categories.all');
        return filter;
    };

    const getCategoryTitle = () => {
        const key = title.toLowerCase();
        if (t(`categories.${key}`) !== `categories.${key}`) {
            return t(`categories.${key}`);
        }
        return title;
    };

    return (
        <div className="page-enter">
            {/* Page Header */}
            <section className={styles.pageHeader}>
                <h1 className={styles.title}>{getCategoryTitle()}</h1>
                <p className={styles.count}>
                    {filteredProducts.length} {filteredProducts.length > 1 ? t('categories.creations') : t('categories.creation')}
                </p>
            </section>

            {/* Filters */}
            <div className={styles.filters}>
                <div className={styles.filtersInner}>
                    {filters.map(filter => (
                        <button
                            key={filter}
                            className={`${styles.filterBtn} ${activeFilter === filter ? styles.filterActive : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {getFilterLabel(filter)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <section className="section--compact">
                <div className="container">
                    <div className="product-grid">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} showPrice={false} />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <p className={styles.noProducts}>
                            {t('categories.noProducts')}
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
}
