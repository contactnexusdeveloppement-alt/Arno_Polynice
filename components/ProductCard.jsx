'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { availabilityStatuses } from '@/data/products';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, showPrice = false, priority = false }) {
    const [isHovered, setIsHovered] = useState(false);
    const availability = availabilityStatuses[product.availability];
    const isUnavailable = product.availability === 'unavailable';
    const primaryImage = product.images?.[0];
    const secondaryImage = product.images?.[1];
    const fallbackColor = product.colors[0]?.hex || '#E5E0D8';

    return (
        <Link
            href={`/produit/${product.slug}`}
            className={`${styles.card} ${isUnavailable ? styles.unavailable : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={styles.imageWrapper} style={{ backgroundColor: fallbackColor }}>
                {primaryImage ? (
                    <Image
                        src={primaryImage}
                        alt={product.name}
                        fill
                        sizes="(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className={`${styles.image} ${isHovered ? styles.imageZoom : ''}`}
                        priority={priority}
                    />
                ) : (
                    <span className={styles.imagePlaceholder}>
                        {product.name.charAt(0)}
                    </span>
                )}

                {secondaryImage && (
                    <Image
                        src={secondaryImage}
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className={`${styles.secondaryImage} ${isHovered ? styles.secondaryImageVisible : ''}`}
                    />
                )}

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
