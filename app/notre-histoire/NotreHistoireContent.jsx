'use client';

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

function HistoryImage({ src, alt, className = '', priority = false, sizes, position = 'center', aspect }) {
    // Si aspect fourni (ex "3 / 4"), on force la cellule à ce ratio
    const wrapperStyle = aspect ? { aspectRatio: aspect } : undefined;
    const wrapperClass = aspect
        ? `${styles.imageWrapper} ${styles.aspectFixed} ${className}`
        : `${styles.imageWrapper} ${className}`;
    return (
        <div className={wrapperClass} style={wrapperStyle}>
            <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                priority={priority}
                className={styles.coverImage}
                style={{ objectPosition: position }}
            />
        </div>
    );
}

function Placeholder({ className = '', ariaLabel }) {
    return (
        <div
            className={`${styles.placeholder} ${className}`}
            role="img"
            aria-label={ariaLabel}
        >
            <span className={styles.placeholderMonogram} aria-hidden="true">AP</span>
        </div>
    );
}

export default function NotreHistoireContent() {
    const { t } = useLanguage();

    return (
        <div className="page-enter">
            <section className={styles.storyPage}>
                {/* Section 1 — Mon histoire (photo gauche / texte droite) */}
                <div className={styles.storyHero}>
                    {/* Titre + label affiché uniquement en mobile (avant la photo) */}
                    <div className={styles.storyHeroMobileTitle} aria-hidden="true">
                        <span className={styles.label}>{t('history.aboutLabel')}</span>
                        <h1 className={styles.title}>{t('history.myStoryTitle')}</h1>
                    </div>
                    <HistoryImage
                        src="/images/histoire/01-hero.webp"
                        alt={t('history.myStoryTitle')}
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        aspect="3 / 4"
                    />
                    <div className={styles.storyHeroContent}>
                        <span className={styles.label}>{t('history.aboutLabel')}</span>
                        <h1 className={styles.title}>{t('history.myStoryTitle')}</h1>
                        <p className={styles.heroText}>{t('history.myStoryText1')}</p>
                        <p className={styles.heroText}>{t('history.myStoryText2')}</p>
                    </div>
                </div>

                <div className={styles.content}>
                    {/* Section 2 — Nos Produits (texte gauche / grille 3 photos droite) */}
                    <div className={`${styles.section} ${styles.sectionReverse}`}>
                        <div className={styles.sectionContent}>
                            <h2 className={styles.sectionTitle}>{t('history.productsTitle')}</h2>
                            <p className={styles.sectionText}>{t('history.productsText1')}</p>
                            <p className={styles.sectionText}>{t('history.productsText2')}</p>
                        </div>
                        <div className={`${styles.imageGridStacked} ${styles.imageGridStackedTall}`}>
                            <HistoryImage
                                src="/images/histoire/02-haut.webp"
                                alt={t('history.productsTitle')}
                                className={styles.gridTop}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <HistoryImage
                                src="/images/histoire/02-bg.webp"
                                alt={t('history.productsTitle')}
                                className={styles.gridBottomLeft}
                                sizes="(max-width: 768px) 50vw, 25vw"
                                aspect="1 / 1"
                            />
                            <HistoryImage
                                src="/images/histoire/02-bd.webp"
                                alt={t('history.productsTitle')}
                                className={styles.gridBottomRight}
                                sizes="(max-width: 768px) 50vw, 25vw"
                                aspect="1 / 1"
                            />
                        </div>
                    </div>

                    {/* Section 3 — Notre ADN (photo gauche / texte droite) */}
                    <div className={`${styles.section} ${styles.sectionPhotoFull}`}>
                        <HistoryImage
                            src="/images/histoire/03-adn.webp"
                            alt={t('history.dnaTitle')}
                            className={styles.sectionImage}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            aspect="3 / 4"
                        />
                        <div className={styles.sectionContent}>
                            <span className={styles.sectionLabel}>{t('history.dnaLabel')}</span>
                            <h2 className={styles.sectionTitle}>{t('history.dnaTitle')}</h2>
                            <p className={styles.sectionQuote}>{t('history.dnaQuote')}</p>
                            <p className={styles.sectionText}>{t('history.dnaText1')}</p>
                            <p className={styles.sectionText}>{t('history.dnaText2')}</p>
                            <p className={styles.sectionText}>{t('history.dnaText3')}</p>
                        </div>
                    </div>

                    {/* Section 4 — L'Éclat du Soir (texte gauche / grille 3 photos droite) */}
                    <div className={`${styles.section} ${styles.sectionReverse}`}>
                        <div className={styles.sectionContent}>
                            <span className={styles.sectionLabel}>{t('history.eveningLabel')}</span>
                            <h2 className={styles.sectionTitle}>{t('history.eveningTitle')}</h2>
                            <p className={styles.sectionQuote}>{t('history.eveningQuote')}</p>
                            <p className={styles.sectionText}>{t('history.eveningText1')}</p>
                            <p className={styles.sectionText}>{t('history.eveningText2')}</p>
                            <p className={styles.sectionText}>
                                {t('history.eveningText3Part1')}XVIII<sup>e</sup>{t('history.eveningText3Part2')}
                            </p>
                            <p className={styles.sectionText}>{t('history.eveningText4')}</p>
                            <p className={styles.sectionText}>{t('history.eveningText5')}</p>
                            <p className={styles.sectionCaption}>{t('history.eveningCaption')}</p>
                        </div>
                        <div className={styles.imageGridStacked}>
                            <HistoryImage
                                src="/images/histoire/05-bd-v2.webp"
                                alt={t('history.eveningTitle')}
                                className={styles.gridTop}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <HistoryImage
                                src="/images/histoire/05-bg-v2.webp"
                                alt={t('history.eveningTitle')}
                                className={styles.gridBottomLeft}
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                            <HistoryImage
                                src="/images/histoire/05-haut-v2.webp"
                                alt={t('history.eveningTitle')}
                                className={styles.gridBottomRight}
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                        </div>
                    </div>

                    {/* Section 5 — Collaboration Exclusive (grille 3 photos gauche / texte droite) */}
                    <div className={`${styles.section} ${styles.sectionGridFirst}`}>
                        <div className={styles.imageGridSideStack}>
                            <HistoryImage
                                src="/images/histoire/04-main.webp"
                                alt={t('history.collabTitle')}
                                className={styles.gridMain}
                                sizes="(max-width: 768px) 100vw, 30vw"
                            />
                            <HistoryImage
                                src="/images/histoire/04-hd.webp"
                                alt={t('history.collabTitle')}
                                className={styles.gridSideTop}
                                sizes="(max-width: 768px) 50vw, 20vw"
                            />
                            <HistoryImage
                                src="/images/histoire/04-bd.webp"
                                alt={t('history.collabTitle')}
                                className={styles.gridSideBottom}
                                sizes="(max-width: 768px) 50vw, 20vw"
                            />
                        </div>
                        <div className={styles.sectionContent}>
                            <span className={styles.sectionLabel}>{t('history.collabLabel')}</span>
                            <h2 className={styles.sectionTitle}>{t('history.collabTitle')}</h2>
                            <p className={styles.sectionQuote}>{t('history.collabQuote')}</p>
                            <p className={styles.sectionText}>{t('history.collabText1')}</p>
                            <p className={styles.sectionText}>{t('history.collabText2')}</p>
                        </div>
                    </div>

                    {/* Section 6 — Légèreté Estivale (texte gauche / photo droite) */}
                    <div className={`${styles.section} ${styles.sectionReverse}`}>
                        <div className={styles.sectionContent}>
                            <span className={styles.sectionLabel}>{t('history.summerLabel')}</span>
                            <h2 className={styles.sectionTitle}>{t('history.summerTitle')}</h2>
                            <p className={styles.sectionQuote}>{t('history.summerQuote')}</p>
                            <p className={styles.sectionText}>{t('history.summerText1')}</p>
                            <p className={styles.sectionText}>{t('history.summerText2')}</p>
                        </div>
                        <HistoryImage
                            src="/images/histoire/06-nouvelle.webp"
                            alt={t('history.summerTitle')}
                            className={styles.sectionImage}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            aspect="1 / 1"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
