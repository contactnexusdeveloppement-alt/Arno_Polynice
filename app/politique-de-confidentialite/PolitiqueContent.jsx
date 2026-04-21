'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from '../legal.module.css';

export default function PolitiqueContent() {
    const { t } = useLanguage();

    return (
        <div className="page-enter">
            <section className={styles.legalPage}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{t('legal.privacy.title')}</h1>
                    <p className={styles.lastUpdate}>{t('legal.lastUpdate')}</p>
                </div>

                <div className={styles.content}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.privacy.sec1Title')}</h2>
                        <p className={styles.text}>{t('legal.privacy.sec1Intro')}</p>
                        <ul className={styles.list}>
                            <li><strong>{t('legal.privacy.sec1Company')}</strong></li>
                            <li>{t('legal.privacy.sec1Publisher')}</li>
                            <li>{t('legal.privacy.sec1Address')}</li>
                            <li>{t('legal.privacy.sec1Siret')}</li>
                            <li>
                                {t('legal.privacy.sec1EmailLabel')}{' '}
                                <a href="mailto:arnopolynice@gmail.com">arnopolynice@gmail.com</a>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.privacy.sec2Title')}</h2>
                        <p className={styles.text}>{t('legal.privacy.sec2Intro')}</p>
                        <ul className={styles.list}>
                            <li>{t('legal.privacy.sec2Item1')}</li>
                            <li>{t('legal.privacy.sec2Item2')}</li>
                            <li>{t('legal.privacy.sec2Item3')}</li>
                            <li>{t('legal.privacy.sec2Item4')}</li>
                            <li>{t('legal.privacy.sec2Item5')}</li>
                            <li>{t('legal.privacy.sec2Item6')}</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.privacy.sec3Title')}</h2>
                        <p className={styles.text}>{t('legal.privacy.sec3Intro')}</p>
                        <ul className={styles.list}>
                            <li>{t('legal.privacy.sec3Item1')}</li>
                            <li>{t('legal.privacy.sec3Item2')}</li>
                            <li>{t('legal.privacy.sec3Item3')}</li>
                            <li>{t('legal.privacy.sec3Item4')}</li>
                            <li>{t('legal.privacy.sec3Item5')}</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.privacy.sec4Title')}</h2>
                        <p className={styles.text}>{t('legal.privacy.sec4Intro')}</p>
                        <ul className={styles.list}>
                            <li><strong>{t('legal.privacy.sec4Item1Bold')}</strong>{t('legal.privacy.sec4Item1')}</li>
                            <li><strong>{t('legal.privacy.sec4Item2Bold')}</strong>{t('legal.privacy.sec4Item2')}</li>
                            <li><strong>{t('legal.privacy.sec4Item3Bold')}</strong>{t('legal.privacy.sec4Item3')}</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.privacy.sec5Title')}</h2>
                        <p className={styles.text}>{t('legal.privacy.sec5Intro')}</p>
                        <ul className={styles.list}>
                            <li>{t('legal.privacy.sec5Item1')}</li>
                            <li>{t('legal.privacy.sec5Item2')}</li>
                            <li>{t('legal.privacy.sec5Item3')}</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.privacy.sec6Title')}</h2>
                        <p className={styles.text}>
                            {t('legal.privacy.sec6Text1Part1')}
                            <strong>{t('legal.privacy.sec6Text1Bold')}</strong>
                            {t('legal.privacy.sec6Text1Part2')}
                        </p>
                        <p className={styles.text}>
                            {t('legal.privacy.sec6Text2Part1')}
                            <strong>{t('legal.privacy.sec6Text2Bold1')}</strong>
                            {t('legal.privacy.sec6Text2Part2')}
                            <strong>{t('legal.privacy.sec6Text2Bold2')}</strong>
                            {t('legal.privacy.sec6Text2Part3')}
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.privacy.sec7Title')}</h2>
                        <p className={styles.text}>{t('legal.privacy.sec7Intro')}</p>
                        <ul className={styles.list}>
                            <li><strong>{t('legal.privacy.sec7Item1Bold')}</strong>{t('legal.privacy.sec7Item1')}</li>
                            <li><strong>{t('legal.privacy.sec7Item2Bold')}</strong>{t('legal.privacy.sec7Item2')}</li>
                            <li><strong>{t('legal.privacy.sec7Item3Bold')}</strong>{t('legal.privacy.sec7Item3')}</li>
                            <li><strong>{t('legal.privacy.sec7Item4Bold')}</strong>{t('legal.privacy.sec7Item4')}</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.privacy.sec8Title')}</h2>
                        <p className={styles.text}>{t('legal.privacy.sec8Intro')}</p>
                        <ul className={styles.list}>
                            <li><strong>{t('legal.privacy.sec8Item1Bold')}</strong>{t('legal.privacy.sec8Item1')}</li>
                            <li><strong>{t('legal.privacy.sec8Item2Bold')}</strong>{t('legal.privacy.sec8Item2')}</li>
                            <li><strong>{t('legal.privacy.sec8Item3Bold')}</strong>{t('legal.privacy.sec8Item3')}</li>
                            <li><strong>{t('legal.privacy.sec8Item4Bold')}</strong>{t('legal.privacy.sec8Item4')}</li>
                            <li><strong>{t('legal.privacy.sec8Item5Bold')}</strong>{t('legal.privacy.sec8Item5')}</li>
                            <li><strong>{t('legal.privacy.sec8Item6Bold')}</strong>{t('legal.privacy.sec8Item6')}</li>
                        </ul>
                        <p className={styles.text}>{t('legal.privacy.sec8Contact')}</p>
                        <p className={styles.text}>{t('legal.privacy.sec8Cnil')}</p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.privacy.sec9Title')}</h2>
                        <p className={styles.text}>{t('legal.privacy.sec9Text')}</p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t('legal.privacy.sec10Title')}</h2>
                        <p className={styles.text}>{t('legal.privacy.sec10Text')}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
