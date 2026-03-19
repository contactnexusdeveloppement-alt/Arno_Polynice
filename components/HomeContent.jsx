'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';
import styles from '@/app/page.module.css';

const heroFallbacks = [
    { bg: '#D4C5B2', text: 'A' },
    { bg: '#2C3E50', text: 'P' },
    { bg: '#C67B5C', text: '✦' },
];

const categoryFallbacks = {
    femme: { bg: '#E8DDD0', text: 'F' },
    homme: { bg: '#2C3E50', text: 'H' },
    unisexe: { bg: '#C67B5C', text: 'U' },
};

export default function HomeContent({ featuredProducts, heroImages, categoryImages, visionImage }) {
    const { t, language } = useLanguage();
    const [products, setProducts] = useState(featuredProducts);

    useEffect(() => {
        if (language === 'fr') {
            setProducts(featuredProducts);
            return;
        }
        fetch(`/api/products?lang=${language}`)
            .then(res => res.json())
            .then(data => {
                if (data.products) setProducts(data.products.filter(p => p.featured));
            })
            .catch(() => setProducts(featuredProducts));
    }, [language, featuredProducts]);

    return (
        <div className="page-enter">
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        <span>{t('home.heroTitle1')}</span>
                        <span>{t('home.heroTitle2')}</span>
                        <span>{t('home.heroTitle3')}</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        {t('home.heroSubtitle')}
                    </p>
                    <div className={styles.heroCta}>
                        <Link href="/femme" className="btn btn--primary">{t('home.discover')}</Link>
                        <Link href="/notre-histoire" className="btn btn--secondary">{t('home.ourStory')}</Link>
                    </div>
                </div>
                <div className={styles.heroVisual}>
                    <div className={styles.heroImageGrid}>
                        {[0, 1, 2].map((i) => {
                            const heroItem = heroImages[i];
                            const fallback = heroFallbacks[i];

                            if (heroItem?.imageUrl) {
                                const Wrapper = heroItem.link ? Link : 'div';
                                const wrapperProps = heroItem.link
                                    ? { href: heroItem.link, className: styles.heroImg }
                                    : { className: styles.heroImg };

                                return (
                                    <Wrapper key={i} {...wrapperProps}>
                                        <Image
                                            src={heroItem.imageUrl}
                                            alt={heroItem.altText || 'Hero image'}
                                            fill
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </Wrapper>
                                );
                            }

                            return (
                                <div key={i} className={styles.heroImg} style={{ backgroundColor: fallback.bg }}>
                                    <span className={styles.heroImgText}>{fallback.text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Marquee */}
            <div className={styles.marquee}>
                <div className={styles.marqueeTrack}>
                    {[...Array(8)].map((_, i) => (
                        <span key={i} className={styles.marqueeItem}>
                            {t('home.marquee')}
                        </span>
                    ))}
                </div>
            </div>

            {/* Featured Products */}
            <section className={`section ${styles.featured}`}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2>{t('home.ourCreations')}</h2>
                        <p className={styles.sectionSubtitle}>
                            {t('home.creationsSubtitle')}
                        </p>
                    </div>
                    <div className="product-grid">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} showPrice={false} />
                        ))}
                    </div>
                    <div className={styles.sectionCta}>
                        <Link href="/boutique" className="btn btn--secondary">{t('home.viewCollection')}</Link>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className={styles.vision}>
                <div className={styles.visionInner}>
                    <div className={styles.visionImage} style={!visionImage ? { backgroundColor: '#3D4F5F' } : undefined}>
                        {visionImage ? (
                            <Image
                                src={visionImage.url}
                                alt={visionImage.altText}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: 'cover' }}
                            />
                        ) : (
                            <span className={styles.visionImageText}>AP</span>
                        )}
                    </div>
                    <div className={styles.visionContent}>
                        <span className={styles.visionLabel}>{t('home.ourVision')}</span>
                        <h2 className={styles.visionTitle}>{t('home.visionTitle')}</h2>
                        <p className={styles.visionText}>
                            {t('home.visionText')}
                        </p>
                        <Link href="/notre-ethique" className="btn btn--secondary btn--small">
                            {t('home.discoverEthics')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className={`section ${styles.categories}`}>
                <div className="container">
                    <div className={styles.catGrid}>
                        {['femme', 'homme', 'unisexe'].map((cat) => {
                            const imgUrl = categoryImages[cat];
                            const fallback = categoryFallbacks[cat];

                            return (
                                <Link key={cat} href={`/${cat}`} className={styles.catCard}>
                                    <div className={styles.catImage} style={!imgUrl ? { backgroundColor: fallback.bg } : undefined}>
                                        {imgUrl ? (
                                            <Image
                                                src={imgUrl}
                                                alt={`Collection ${t(`categories.${cat}`)}`}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <span className={styles.catImageText}>{fallback.text}</span>
                                        )}
                                    </div>
                                    <h3 className={styles.catName}>{t(`categories.${cat}`)}</h3>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
