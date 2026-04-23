'use client';

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import styles from './PressItem.module.css';

/**
 * Une parution presse rendue comme une SECTION style Notre Histoire :
 *   - Layout grid 2 colonnes : image (ou vidéo embed) + bloc texte
 *   - Alternance gauche/droite gérée par la prop `reversed` (passée
 *     par le parent selon l'index pair/impair)
 *
 * Champs metaobject press_item utilisés :
 *   position, type (article|video), media_name, title, excerpt,
 *   publish_date, url, main_image
 */

function getYouTubeEmbed(url) {
    if (!url) return null;
    const patterns = [
        /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
        /youtu\.be\/([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const p of patterns) {
        const m = url.match(p);
        if (m) return `https://www.youtube.com/embed/${m[1]}`;
    }
    return null;
}

function getVimeoEmbed(url) {
    if (!url) return null;
    const m = url.match(/vimeo\.com\/(\d+)/);
    return m ? `https://player.vimeo.com/video/${m[1]}` : null;
}

const LOCALE_MAP = { fr: 'fr-FR', en: 'en-GB', es: 'es-ES' };

function formatDate(dateStr, lang) {
    if (!dateStr) return '';
    try {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString(LOCALE_MAP[lang] || 'fr-FR', {
            year: 'numeric', month: 'long', day: 'numeric',
        });
    } catch {
        return dateStr;
    }
}

export default function PressItem({ item, reversed = false }) {
    const { t, language } = useLanguage();
    const isVideo = item.type === 'video';
    const embedUrl = isVideo
        ? (getYouTubeEmbed(item.url) || getVimeoEmbed(item.url))
        : null;
    const dateLabel = formatDate(item.publishDate, language);

    // Le DOM va dans l'ordre : visuel puis texte. Pour inverser visuellement
    // (texte à gauche), on passe `reversed=true` qui ajoute la classe CSS
    // qui fait order:2 sur le visuel.
    const sectionClass = `${styles.section} ${reversed ? styles.sectionReverse : ''}`;

    return (
        <article className={sectionClass}>
            {/* Visuel : iframe vidéo ou image */}
            <div className={styles.visual}>
                {isVideo && embedUrl ? (
                    <div className={styles.videoWrapper}>
                        <iframe
                            src={embedUrl}
                            title={item.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                ) : item.mainImage?.url ? (
                    <div className={styles.imageWrapper}>
                        <Image
                            src={item.mainImage.url}
                            alt={item.mainImage.alt || item.title || item.mediaName || 'Parution presse'}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className={styles.image}
                        />
                    </div>
                ) : (
                    <div className={styles.placeholder} role="img" aria-label="Image à venir">
                        <span className={styles.placeholderMonogram}>AP</span>
                    </div>
                )}
            </div>

            {/* Bloc texte */}
            <div className={styles.content}>
                {item.mediaName && (
                    <span className={styles.label}>{item.mediaName}</span>
                )}
                <h2 className={styles.title}>{item.title}</h2>
                {item.excerpt && (
                    <p className={styles.excerpt}>« {item.excerpt} »</p>
                )}
                <div className={styles.footer}>
                    {dateLabel && <span className={styles.date}>{dateLabel}</span>}
                    {!isVideo && item.url && (
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.readMore}
                        >
                            {t('press.readArticle')} →
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}
