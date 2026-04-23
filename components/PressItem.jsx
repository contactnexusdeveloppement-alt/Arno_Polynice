'use client';

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import styles from './PressItem.module.css';

/**
 * Affiche une parution presse :
 *   - type "article" : logo média + titre + extrait + date + lien externe
 *   - type "video"   : embed YouTube/Vimeo + titre + date
 *
 * L'URL renseignée par le client peut être :
 *   - article : https://media.fr/article-xyz → ouvert dans nouvel onglet
 *   - video   : https://www.youtube.com/watch?v=XYZ → converti en embed
 */

function getYouTubeEmbed(url) {
    if (!url) return null;
    // youtube.com/watch?v=XYZ ou youtu.be/XYZ ou youtube.com/embed/XYZ
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
    if (m) return `https://player.vimeo.com/video/${m[1]}`;
    return null;
}

// Map langue UI → locale BCP-47 pour le formatage de date
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

export default function PressItem({ item }) {
    const { t, language } = useLanguage();
    const isVideo = item.type === 'video';
    const embedUrl = isVideo
        ? (getYouTubeEmbed(item.url) || getVimeoEmbed(item.url))
        : null;
    const dateLabel = formatDate(item.publishDate, language);

    if (isVideo && embedUrl) {
        return (
            <article className={`${styles.item} ${styles.itemVideo}`}>
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
                <div className={styles.videoMeta}>
                    {item.mediaName && <span className={styles.mediaName}>{item.mediaName}</span>}
                    <h2 className={styles.videoTitle}>{item.title}</h2>
                    {dateLabel && <span className={styles.date}>{dateLabel}</span>}
                </div>
            </article>
        );
    }

    // Article (par défaut). Lien externe dans un nouvel onglet pour ne pas perdre le visiteur.
    return (
        <article className={styles.item}>
            <div className={styles.logoWrapper}>
                {item.mediaLogo?.url ? (
                    <Image
                        src={item.mediaLogo.url}
                        alt={item.mediaLogo.alt || item.mediaName || 'Logo média'}
                        fill
                        sizes="(max-width: 768px) 100vw, 200px"
                        className={styles.logo}
                    />
                ) : (
                    <div className={styles.logoPlaceholder}>
                        <span>{item.mediaName?.charAt(0) || '?'}</span>
                    </div>
                )}
            </div>
            <div className={styles.content}>
                {item.mediaName && <span className={styles.mediaName}>{item.mediaName}</span>}
                <h2 className={styles.articleTitle}>{item.title}</h2>
                {item.excerpt && (
                    <p className={styles.excerpt}>« {item.excerpt} »</p>
                )}
                <div className={styles.footer}>
                    {dateLabel && <span className={styles.date}>{dateLabel}</span>}
                    {item.url && (
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
