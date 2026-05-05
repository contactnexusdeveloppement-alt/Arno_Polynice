'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

/**
 * Page client : Vêtements Sur Mesure à Épinal.
 *
 * Structure :
 *   1. Hero (label + H1 + intro)
 *   2. Process en 4 étapes (RDV → Mesures → Confection → Essayage)
 *   3. Matières disponibles
 *   4. Délais & tarifs indicatifs
 *   5. CTA contact (sujet pré-rempli "sur mesure" via param URL)
 */

const STEPS = [
    { num: '01', titleKey: 'customMade.step1Title', textKey: 'customMade.step1Text' },
    { num: '02', titleKey: 'customMade.step2Title', textKey: 'customMade.step2Text' },
    { num: '03', titleKey: 'customMade.step3Title', textKey: 'customMade.step3Text' },
    { num: '04', titleKey: 'customMade.step4Title', textKey: 'customMade.step4Text' },
];

export default function SurMesureContent() {
    const { t } = useLanguage();

    return (
        <div className="page-enter">
            <section className={styles.surMesurePage}>
                {/* Hero */}
                <header className={styles.hero}>
                    <span className={styles.label}>{t('customMade.label')}</span>
                    <h1 className={styles.title}>{t('customMade.title')}</h1>
                    <p className={styles.subtitle}>{t('customMade.subtitle')}</p>
                </header>

                {/* Intro */}
                <section className={styles.intro}>
                    <h2 className={styles.sectionTitle}>{t('customMade.introTitle')}</h2>
                    <p className={styles.text}>{t('customMade.introText1')}</p>
                    <p className={styles.text}>{t('customMade.introText2')}</p>
                </section>

                {/* Process en 4 étapes */}
                <section className={styles.process}>
                    <h2 className={styles.sectionTitle}>{t('customMade.processTitle')}</h2>
                    <div className={styles.steps}>
                        {STEPS.map((step) => (
                            <div key={step.num} className={styles.step}>
                                <span className={styles.stepNum} aria-hidden="true">{step.num}</span>
                                <h3 className={styles.stepTitle}>{t(step.titleKey)}</h3>
                                <p className={styles.stepText}>{t(step.textKey)}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Matières */}
                <section className={styles.materials}>
                    <h2 className={styles.sectionTitle}>{t('customMade.materialsTitle')}</h2>
                    <p className={styles.text}>{t('customMade.materialsText')}</p>
                </section>

                {/* Délais & tarifs */}
                <section className={styles.timing}>
                    <h2 className={styles.sectionTitle}>{t('customMade.timingTitle')}</h2>
                    <p className={styles.text}>{t('customMade.timingText')}</p>
                </section>

                {/* CTA */}
                <section className={styles.cta}>
                    <h2 className={styles.ctaTitle}>{t('customMade.ctaTitle')}</h2>
                    <p className={styles.ctaText}>{t('customMade.ctaText')}</p>
                    <Link href="/contact" className="btn btn--primary">
                        {t('customMade.ctaButton')}
                    </Link>
                </section>
            </section>
        </div>
    );
}
