'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from '../legal.module.css';

export default function MentionsLegalesContent() {
    const { t } = useLanguage();

    return (
        <div className="page-enter">
            <section className={styles.legalPage}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{t('legal.mentions.title')}</h1>
                    <p className={styles.lastUpdate}>{t('legal.lastUpdate')}</p>
                </div>

                <div className={styles.content}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.mentions.sec1Title')}</h2>
                        <p className={styles.text}>{t('legal.mentions.sec1Intro')}</p>
                        <ul className={styles.list}>
                            <li>{t('legal.mentions.sec1Company')}</li>
                            <li>{t('legal.mentions.sec1Legal')}</li>
                            <li>{t('legal.mentions.sec1Publisher')}</li>
                            <li>{t('legal.mentions.sec1Address')}</li>
                            <li>{t('legal.mentions.sec1Siren')}</li>
                            <li>{t('legal.mentions.sec1Siret')}</li>
                            <li>{t('legal.mentions.sec1Naf')}</li>
                            <li>{t('legal.mentions.sec1Activity')}</li>
                            <li>{t('legal.mentions.sec1Rne')}</li>
                            <li>
                                {t('legal.mentions.sec1EmailLabel')}{' '}
                                <a href="mailto:arnopolynice@gmail.com">arnopolynice@gmail.com</a>
                            </li>
                            <li>{t('legal.mentions.sec1Tva')}</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.mentions.sec2Title')}</h2>
                        <p className={styles.text}>{t('legal.mentions.sec2Intro')}</p>
                        <ul className={styles.list}>
                            <li>Vercel Inc.</li>
                            <li>340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
                            <li><a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a></li>
                        </ul>
                        <p className={styles.text}>{t('legal.mentions.sec2Shopify')}</p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.mentions.sec3Title')}</h2>
                        <p className={styles.text}>{t('legal.mentions.sec3Text1')}</p>
                        <p className={styles.text}>{t('legal.mentions.sec3Text2')}</p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.mentions.sec4Title')}</h2>
                        <p className={styles.text}>{t('legal.mentions.sec4Text1')}</p>
                        <p className={styles.text}>{t('legal.mentions.sec4Text2')}</p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.mentions.sec5Title')}</h2>
                        <p className={styles.text}>
                            {t('legal.mentions.sec5TextPart1')}
                            <a href="/politique-de-confidentialite">{t('legal.mentions.sec5Link')}</a>
                            {t('legal.mentions.sec5TextPart2')}
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.mentions.sec6Title')}</h2>
                        <p className={styles.text}>{t('legal.mentions.sec6Text')}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
