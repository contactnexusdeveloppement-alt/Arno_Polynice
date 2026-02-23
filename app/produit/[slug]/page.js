'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { products, availabilityStatuses } from '@/data/products';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import { use } from 'react';

export default function ProductPage({ params }) {
    const { slug } = use(params);
    const product = products.find(p => p.slug === slug);

    if (!product) return notFound();

    return <ProductDetail product={product} />;
}

function ProductDetail({ product }) {
    const { addItem } = useCart();
    const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
    const [selectedSize, setSelectedSize] = useState('');
    const [activeImage, setActiveImage] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const [added, setAdded] = useState(false);

    const availability = availabilityStatuses[product.availability];
    const canAddToCart = product.availability !== 'unavailable';

    const handleAddToCart = () => {
        if (!selectedSize) return;
        addItem(product, selectedColor, selectedSize);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className={`page-enter ${styles.productPage}`}>
            {/* Breadcrumb */}
            <div className={styles.breadcrumb}>
                <Link href="/">Accueil</Link>
                <span>/</span>
                <Link href={`/${product.category}`}>
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Link>
                <span>/</span>
                <span className={styles.breadcrumbCurrent}>{product.name}</span>
            </div>

            <div className={styles.layout}>
                {/* Images */}
                <div className={styles.gallery}>
                    <div className={styles.mainImage} style={{ backgroundColor: product.colors.find(c => c.name === selectedColor)?.hex || '#E5E0D8' }}>
                        <span className={styles.mainImageLetter}>{product.name.charAt(0)}</span>
                    </div>
                    <div className={styles.thumbs}>
                        {product.images.map((img, i) => (
                            <div
                                key={i}
                                className={`${styles.thumb} ${activeImage === i ? styles.thumbActive : ''}`}
                                onClick={() => setActiveImage(i)}
                                style={{ backgroundColor: i === 0 ? (product.colors.find(c => c.name === selectedColor)?.hex || '#E5E0D8') : '#D4C5B2' }}
                            >
                                <span className={styles.thumbLetter}>{i + 1}</span>
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

                        {/* Colors */}
                        <div className={styles.section}>
                            <label className={styles.label}>
                                Coloris — <span className={styles.labelValue}>{selectedColor}</span>
                            </label>
                            <div className={styles.swatches}>
                                {product.colors.map(color => (
                                    <button
                                        key={color.name}
                                        className={`${styles.swatch} ${selectedColor === color.name ? styles.swatchActive : ''}`}
                                        style={{ backgroundColor: color.hex }}
                                        onClick={() => setSelectedColor(color.name)}
                                        title={color.name}
                                        aria-label={`Couleur ${color.name}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className={styles.section}>
                            <label className={styles.label}>Taille</label>
                            <div className={styles.sizes}>
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeBtnActive : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            {!selectedSize && (
                                <p className={styles.sizeHint}>Veuillez sélectionner une taille</p>
                            )}
                        </div>

                        {/* Add to cart */}
                        {canAddToCart ? (
                            <button
                                className={`btn btn--primary ${styles.addToCart} ${added ? styles.addedToCart : ''}`}
                                onClick={handleAddToCart}
                                disabled={!selectedSize}
                            >
                                {added ? '✓ Ajouté au panier' : 'Ajouter au panier'}
                            </button>
                        ) : (
                            <button className={`btn btn--secondary ${styles.addToCart}`} disabled>
                                Indisponible
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
                            <span>Détails & Composition</span>
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
