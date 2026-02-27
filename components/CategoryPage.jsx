'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import styles from './CategoryPage.module.css';

export default function CategoryPage({ title, products, subcategories }) {
    const [activeFilter, setActiveFilter] = useState('Tout');

    const filters = ['Tout', ...subcategories];
    const filteredProducts = activeFilter === 'Tout'
        ? products
        : products.filter(p => p.subcategory === activeFilter);

    return (
        <div className="page-enter">
            {/* Page Header */}
            <section className={styles.pageHeader}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.count}>{filteredProducts.length} création{filteredProducts.length > 1 ? 's' : ''}</p>
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
                            {filter}
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
                            Aucun produit dans cette catégorie pour le moment.
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
}
