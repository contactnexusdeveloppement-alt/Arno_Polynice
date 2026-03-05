'use client';

import { useState } from 'react';
import Link from 'next/link';
import { availabilityStatuses } from '@/data/products';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, showPrice = false }) {
    const [isHovered, setIsHovered] = useState(false);
    const availability = availabilityStatuses[product.availability];
    const isUnavailable = product.availability === 'unavailable';

    return (
        <Link
            href={`/produit/${product.slug}`}
            className={`${styles.card} ${isUnavailable ? styles.unavailable : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={styles.imageWrapper}>
                <div
                    className={styles.image}
                    style={{
                        backgroundColor: product.colors[0]?.hex || '#E5E0D8',
                        backgroundImage: product.images && product.images[0] ? `url(${product.images[0]})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                    }}
                >
                    {/* Secondary Image for Hover */}
                    {product.images && product.images[1] && (
                        <div
                            className={`${styles.secondaryImage} ${isHovered ? styles.secondaryImageVisible : ''}`}
                            style={{
                                backgroundImage: `url(${product.images[1]})`
                            }}
                        />
                    )}

                    {(!product.images || !product.images[0]) && (
                        <span className={styles.imagePlaceholder}>
                            {product.name.charAt(0)}
                        </span>
                    )}
                </div>

                {/* Availability badge */}
                {product.availability !== 'available' && (
                    <span
                        className={styles.badge}
                        style={{ '--badge-color': availability.color }}
                    >
                        {availability.icon} {availability.label}
                    </span>
                )}

                {/* Color dots */}
                {product.colors.length > 1 && (
                    <div className={`${styles.colors} ${isHovered ? styles.colorsVisible : ''}`}>
                        {product.colors.map(color => (
                            <span
                                key={color.name}
                                className={styles.colorDot}
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                            />
                        ))}
                    </div>
                )}

                {/* Made in France badge */}
                {product.madeInFrance && (
                    <span className={styles.madeInFranceBadge}>
                        <span className={styles.flagBlue} />
                        <span className={styles.flagWhite} />
                        <span className={styles.flagRed} />
                    </span>
                )}
            </div>

            <div className={styles.info}>
                <h3 className={styles.name}>{product.name}</h3>
                {product.subcategory && (
                    <span className={styles.category}>{product.subcategory}</span>
                )}
                {showPrice && (
                    <span className={styles.price}>{product.price},00 €</span>
                )}
            </div>
        </Link>
    );
}
