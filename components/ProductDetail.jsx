'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { availabilityStatuses } from '@/data/products';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/app/produit/[slug]/page.module.css';

export default function ProductDetail({ product }) {
    const { addItem } = useCart();
    const { t, language } = useLanguage();
    const [currentProduct, setCurrentProduct] = useState(product);

    useEffect(() => {
        if (language === 'fr') {
            setCurrentProduct(product);
            return;
        }
        fetch(`/api/products?lang=${language}&slug=${product.slug}`)
            .then(res => res.json())
            .then(data => {
                if (data.product) setCurrentProduct(data.product);
            })
            .catch(() => setCurrentProduct(product));
    }, [language, product]);

    const [selectedColor, setSelectedColor] = useState(currentProduct.colors[0]?.name || '');

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
    const [addError, setAddError] = useState('');

    const availability = availabilityStatuses[currentProduct.availability] || availabilityStatuses['available'];
    const canAddToCart = currentProduct.availability !== 'unavailable';
    const isShopifyProduct = Array.isArray(currentProduct.variants) && currentProduct.variants.length > 0;

    const handleAddToCart = () => {
        if (!selectedSize || added) return;

        setAddError('');

        // Recherche de la variante Shopify (checkout via merchandiseId).
        // Stratégie :
        //   1) Match exact couleur + taille
        //   2) Fallback : taille seule (ex: produit à couleur unique)
        //   3) Échec → on refuse l'ajout et on affiche un message clair
        //      (plutôt que d'envoyer une variante aléatoire au checkout)
        let variantId = null;
        if (isShopifyProduct) {
            const variant = currentProduct.variants.find(v =>
                v.selectedOptions.some(o => (o.name === 'Couleur' || o.name === 'Coloris') && o.value === selectedColor) &&
                v.selectedOptions.some(o => (o.name === 'Taille' || o.name === 'Size') && o.value === selectedSize)
            );
            if (variant) {
                variantId = variant.id;
            } else {
                // Fallback légitime : produit sans option "Couleur"
                const sizeOnlyVariant = currentProduct.variants.find(v =>
                    v.selectedOptions.some(o => (o.name === 'Taille' || o.name === 'Size') && o.value === selectedSize)
                );
                if (sizeOnlyVariant) variantId = sizeOnlyVariant.id;
            }

            if (!variantId) {
                // On refuse l'ajout : mieux vaut un message clair qu'un checkout qui plante.
                setAddError(t('productPage.variantMissing'));
                return;
            }
        }

        addItem(currentProduct, selectedColor, selectedSize, 1, variantId);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const getCategoryLabel = () => {
        const key = currentProduct.category.toLowerCase();
        if (t(`categories.${key}`) !== `categories.${key}`) {
            return t(`categories.${key}`);
        }
        return currentProduct.category.charAt(0).toUpperCase() + currentProduct.category.slice(1);
    };

    return (
        <div className={`page-enter ${styles.productPage}`}>
            {/* Breadcrumb */}
            <div className={styles.breadcrumb}>
                <Link href="/">{t('product.home')}</Link>
                <span>/</span>
                <Link href={`/${currentProduct.category}`}>
                    {getCategoryLabel()}
                </Link>
                <span>/</span>
                <span className={styles.breadcrumbCurrent}>{currentProduct.name}</span>
            </div>

            <div className={styles.layout}>
                {/* Images */}
                <div className={styles.gallery}>
                    <div
                        className={styles.mainImage}
                        style={{ backgroundColor: currentProduct.colors.find(c => c.name === selectedColor)?.hex || '#E5E0D8' }}
                    >
                        {currentProduct.images[activeImage] ? (
                            <Image
                                src={currentProduct.images[activeImage]}
                                alt={`${currentProduct.name} — ${selectedColor}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                                className={styles.mainImageImg}
                            />
                        ) : (
                            <span className={styles.mainImageLetter}>{currentProduct.name.charAt(0)}</span>
                        )}
                    </div>
                    <div className={styles.thumbs}>
                        {currentProduct.images.map((img, i) => (
                            <button
                                type="button"
                                key={i}
                                className={`${styles.thumb} ${activeImage === i ? styles.thumbActive : ''}`}
                                onClick={() => setActiveImage(i)}
                                aria-label={`${t('product.viewImage')} ${i + 1}`}
                            >
                                {img ? (
                                    <Image
                                        src={img}
                                        alt=""
                                        fill
                                        sizes="72px"
                                        className={styles.thumbImg}
                                    />
                                ) : (
                                    <span className={styles.thumbLetter}>{i + 1}</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info Panel */}
                <div className={styles.info}>
                    <div className={styles.infoSticky}>
                        {/* Name & Price */}
                        <h1 className={styles.productName}>{currentProduct.name}</h1>
                        <p className={styles.price}>{currentProduct.price},00 €</p>

                        {/* Availability */}
                        <div className={styles.availability} style={{ '--avail-color': availability.color }}>
                            <span className={styles.availIcon}>{availability.icon}</span>
                            <span>{availability.label}</span>
                        </div>
                        {(currentProduct.availability === 'made_to_order' || currentProduct.availability === 'waiting_materials') && (
                            <p className={styles.delayWarning}>
                                ⚠ {availability.delay}
                            </p>
                        )}

                        {/* Made in France badge */}
                        {currentProduct.madeInFrance && (
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
                                {currentProduct.colors.map(color => (
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
                                {currentProduct.sizes.map(size => {
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

                        {/* Add to cart.
                            Libellé dynamique quand le bouton est disabled pour éviter
                            l'effet "bouton invisible" sur mobile : le visiteur comprend
                            tout de suite ce qu'il manque (taille à sélectionner).
                            La classe `addToCartWaiting` garde le bouton pleinement
                            visible même en disabled (plus de opacity 0.4 translucide). */}
                        {canAddToCart ? (
                            <button
                                className={`btn btn--primary ${styles.addToCart} ${added ? styles.addedToCart : ''} ${!selectedSize ? styles.addToCartWaiting : ''}`}
                                onClick={handleAddToCart}
                                disabled={!selectedSize || added}
                            >
                                {added
                                    ? t('product.adding')
                                    : !selectedSize
                                        ? t('product.selectSizeFirst')
                                        : t('product.addToCart')
                                }
                            </button>
                        ) : (
                            <button className={`btn btn--secondary ${styles.addToCart}`} disabled>
                                {t('product.unavailable')}
                            </button>
                        )}
                        {addError && (
                            <p className={styles.sizeHint} role="alert" aria-live="polite">
                                {addError}
                            </p>
                        )}

                        {/* Description */}
                        <div className={styles.description}>
                            <p>{currentProduct.description}</p>
                        </div>

                        {/* Details accordion */}
                        <button
                            className={styles.accordion}
                            onClick={() => setShowDetails(!showDetails)}
                            aria-expanded={showDetails}
                            aria-controls="product-details-content"
                        >
                            <span>{t('product.details')}</span>
                            <span className={`${styles.accordionIcon} ${showDetails ? styles.accordionOpen : ''}`}>+</span>
                        </button>
                        {showDetails && (
                            <div id="product-details-content" className={styles.accordionContent}>
                                <p>{currentProduct.details}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
