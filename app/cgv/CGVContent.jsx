'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from '../legal.module.css';

export default function CGVContent() {
    const { t } = useLanguage();

    return (
        <div className="page-enter">
            <section className={styles.legalPage}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{t('legal.cgv.title')}</h1>
                    <p className={styles.lastUpdate}>{t('legal.lastUpdate')}</p>
                </div>

                <div className={styles.content}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.cgv.sec1Title')}</h2>
                        <p className={styles.text}>{t('legal.cgv.sec1Text1')}</p>
                        <p className={styles.text}>{t('legal.cgv.sec1Text2')}</p>
                        <p className={styles.text}>{t('legal.cgv.sec1Text3')}</p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.cgv.sec2Title')}</h2>
                        <p className={styles.text}>{t('legal.cgv.sec2Text1')}</p>
                        <p className={styles.text}>{t('legal.cgv.sec2Text2')}</p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.cgv.sec3Title')}</h2>
                        <p className={styles.text}>{t('legal.cgv.sec3Text1')}</p>
                        <p className={styles.text}>{t('legal.cgv.sec3Text2')}</p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.cgv.sec4Title')}</h2>
                        <p className={styles.text}>{t('legal.cgv.sec4Text1')}</p>
                        <p className={styles.text}>{t('legal.cgv.sec4Text2')}</p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.cgv.sec5Title')}</h2>
                        <p className={styles.text}>{t('legal.cgv.sec5Text1')}</p>
                        <p className={styles.text}>{t('legal.cgv.sec5Text2')}</p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.cgv.sec6Title')}</h2>
                        <p className={styles.text}>{t('legal.cgv.sec6Text1')}</p>
                        <ul className={styles.list}>
                            <li><strong>{t('legal.cgv.sec6Item1Bold')}</strong>{t('legal.cgv.sec6Item1')}</li>
                            <li><strong>{t('legal.cgv.sec6Item2Bold')}</strong>{t('legal.cgv.sec6Item2')}</li>
                        </ul>
                        <p className={styles.text}>{t('legal.cgv.sec6Text2')}</p>
                        <p className={styles.text}>{t('legal.cgv.sec6Text3')}</p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.cgv.sec7Title')}</h2>
                        <p className={styles.text}>
                            {t('legal.cgv.sec7Text1Part1')}<strong>{t('legal.cgv.sec7Text1Bold')}</strong>{t('legal.cgv.sec7Text1Part2')}
                        </p>
                        <p className={styles.text}>{t('legal.cgv.sec7Text2')}</p>
                        <p className={styles.text}>{t('legal.cgv.sec7Text3')}</p>
                        <p className={styles.text}>{t('legal.cgv.sec7Text4')}</p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.cgv.sec8Title')}</h2>
                        <p className={styles.text}>{t('legal.cgv.sec8Text1')}</p>
                        <p className={styles.text}>{t('legal.cgv.sec8Text2')}</p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.cgv.sec9Title')}</h2>
                        <p className={styles.text}>
                            {t('legal.cgv.sec9TextPart1')}
                            <a href="/politique-de-confidentialite">{t('legal.cgv.sec9Link')}</a>
                            {t('legal.cgv.sec9TextPart2')}
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.cgv.sec10Title')}</h2>
                        <p className={styles.text}>{t('legal.cgv.sec10Text1')}</p>
                        <p className={styles.text}>
                            {t('legal.cgv.sec10Text2Part1')}
                            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                                {t('legal.cgv.sec10Link')}
                            </a>
                            {t('legal.cgv.sec10Text2Part2')}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
