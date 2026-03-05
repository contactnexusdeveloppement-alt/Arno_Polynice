'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { availabilityStatuses } from '@/data/products';
import Link from 'next/link';
import styles from '@/app/produit/[slug]/page.module.css';

export default function ProductDetail({ product }) {
    const { addItem } = useCart();
    const { t } = useLanguage();

    const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');

    // Reset size if the selected size is not available for new color
    const checkSizeAvailability = (color, size) => {
        if (!product.variants) return true; // mock products are always available
        const variant = product.variants.find(v =>
            v.selectedOptions.some(o => (o.name === 'Couleur' || o.name === 'Coloris') && o.value === color) &&
            v.selectedOptions.some(o => (o.name === 'Taille' || o.name === 'Size') && o.value === size)
        );
        return variant ? variant.availableForSale : false;
    };

    const [selectedSize, setSelectedSize] = useState('');
    const [activeImage, setActiveImage] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const [added, setAdded] = useState(false);

    const availability = availabilityStatuses[product.availability] || availabilityStatuses['available'];
    const canAddToCart = product.availability !== 'unavailable';

    const handleAddToCart = () => {
        if (!selectedSize) return;

        // Find the matching Shopify variant ID for checkout
        let variantId = null;
        if (product.variants && product.variants.length > 0) {
            const variant = product.variants.find(v =>
                v.selectedOptions.some(o => (o.name === 'Couleur' || o.name === 'Coloris') && o.value === selectedColor) &&
                v.selectedOptions.some(o => (o.name === 'Taille' || o.name === 'Size') && o.value === selectedSize)
            );
            // Fallback: if no color/size combo match, try size only (for products with single color)
            if (!variant) {
                const sizeOnlyVariant = product.variants.find(v =>
                    v.selectedOptions.some(o => (o.name === 'Taille' || o.name === 'Size') && o.value === selectedSize)
                );
                if (sizeOnlyVariant) variantId = sizeOnlyVariant.id;
            } else {
                variantId = variant.id;
            }
            // Last fallback: first available variant
            if (!variantId && product.variants[0]) {
                variantId = product.variants[0].id;
            }
        }

        addItem(product, selectedColor, selectedSize, 1, variantId);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const getCategoryLabel = () => {
        const key = product.category.toLowerCase();
        if (t(`categories.${key}`) !== `categories.${key}`) {
            return t(`categories.${key}`);
        }
        return product.category.charAt(0).toUpperCase() + product.category.slice(1);
    };

    return (
        <div className={`page-enter ${styles.productPage}`}>
            {/* Breadcrumb */}
            <div className={styles.breadcrumb}>
                <Link href="/">{t('product.home')}</Link>
                <span>/</span>
                <Link href={`/${product.category}`}>
                    {getCategoryLabel()}
                </Link>
                <span>/</span>
                <span className={styles.breadcrumbCurrent}>{product.name}</span>
            </div>

            <div className={styles.layout}>
                {/* Images */}
                <div className={styles.gallery}>
                    <div
                        className={styles.mainImage}
                        style={{
                            backgroundColor: product.colors.find(c => c.name === selectedColor)?.hex || '#E5E0D8',
                            backgroundImage: product.images[activeImage] ? `url(${product.images[activeImage]})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {!product.images[activeImage] && <span className={styles.mainImageLetter}>{product.name.charAt(0)}</span>}
                    </div>
                    <div className={styles.thumbs}>
                        {product.images.map((img, i) => (
                            <div
                                key={i}
                                className={`${styles.thumb} ${activeImage === i ? styles.thumbActive : ''}`}
                                onClick={() => setActiveImage(i)}
                                style={{
                                    backgroundColor: i === 0 ? (product.colors.find(c => c.name === selectedColor)?.hex || '#E5E0D8') : '#D4C5B2',
                                    backgroundImage: `url(${img})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                {!img && <span className={styles.thumbLetter}>{i + 1}</span>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info Panel */}
                <div className={styles.info}>
                    <div className={styles.infoSticky}>
                        {/* Name & Price */}
                        <h1 className={styles.productName}>{product.name}</h1>
                        <p className={styles.price}>{product.price},00 €</p>

                        {/* Availability */}
                        <div className={styles.availability} style={{ '--avail-color': availability.color }}>
                            <span className={styles.availIcon}>{availability.icon}</span>
                            <span>{availability.label}</span>
                        </div>
                        {(product.availability === 'made_to_order' || product.availability === 'waiting_materials') && (
                            <p className={styles.delayWarning}>
                                ⚠ {availability.delay}
                            </p>
                        )}

                        {/* Made in France badge */}
                        {product.madeInFrance && (
                            <div className={styles.madeInFrance}>
                                <span className={styles.madeInFranceFlag}>
                                    <span className={styles.flagBlue} />
                                    <span className={styles.flagWhite} />
                                    <span className={styles.flagRed} />
                                </span>
                                <span>{t('product.madeInFrance')}</span>
                            </div>
                        )}

                        {/* Colors */}
                        <div className={styles.section}>
                            <label className={styles.label}>
                                {t('product.color')} — <span className={styles.labelValue}>{selectedColor}</span>
                            </label>
                            <div className={styles.swatches}>
                                {product.colors.map(color => (
                                    <button
                                        key={color.name}
                                        className={`${styles.swatch} ${selectedColor === color.name ? styles.swatchActive : ''}`}
                                        style={{ backgroundColor: color.hex }}
                                        onClick={() => {
                                            setSelectedColor(color.name);
                                            if (selectedSize && !checkSizeAvailability(color.name, selectedSize)) {
                                                setSelectedSize(''); // Reset size if unavailable in new color
                                            }
                                        }}
                                        title={color.name}
                                        aria-label={`${t('product.color')} ${color.name}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className={styles.section}>
                            <label className={styles.label}>{t('product.size')}</label>
                            <div className={styles.sizes}>
                                {product.sizes.map(size => {
                                    const isAvailable = checkSizeAvailability(selectedColor, size);
                                    return (
                                        <button
                                            key={size}
                                            className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeBtnActive : ''} ${!isAvailable ? styles.sizeBtnUnavailable : ''}`}
                                            onClick={() => isAvailable && setSelectedSize(size)}
                                            disabled={!isAvailable}
                                            title={!isAvailable ? t('product.sizeUnavailable') : ''}
                                        >
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                            {!selectedSize && (
                                <p className={styles.sizeHint}>{t('product.selectSizeWarning')}</p>
                            )}
                        </div>

                        {/* Add to cart */}
                        {canAddToCart ? (
                            <button
                                className={`btn btn--primary ${styles.addToCart} ${added ? styles.addedToCart : ''}`}
                                onClick={handleAddToCart}
                                disabled={!selectedSize}
                            >
                                {added ? t('product.adding') : t('product.addToCart')}
                            </button>
                        ) : (
                            <button className={`btn btn--secondary ${styles.addToCart}`} disabled>
                                {t('product.unavailable')}
                            </button>
                        )}

                        {/* Description */}
                        <div className={styles.description}>
                            <p>{product.description}</p>
                        </div>

                        {/* Details accordion */}
                        <button
                            className={styles.accordion}
                            onClick={() => setShowDetails(!showDetails)}
                        >
                            <span>{t('product.details')}</span>
                            <span className={`${styles.accordionIcon} ${showDetails ? styles.accordionOpen : ''}`}>+</span>
                        </button>
                        {showDetails && (
                            <div className={styles.accordionContent}>
                                <p>{product.details}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
