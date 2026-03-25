import styles from './page.module.css';

export const metadata = {
    title: 'Notre Éthique — Mode Responsable et Artisanale',
    description: 'Les engagements d\'Arno Polynice : confection éthique, matériaux responsables, production locale dans les Vosges. Une mode artisanale respectueuse de l\'environnement.',
    alternates: { canonical: 'https://www.arno-polynice.com/notre-ethique' },
};

export default function NotreEthiquePage() {
    return (
        <div className="page-enter">
            <section className={styles.ethicsPage}>
                <div className={styles.header}>
                    <span className={styles.label}>Nos engagements</span>
                    <h1 className={styles.title}>Notre Éthique</h1>
                    <p className={styles.intro}>
                        Nous croyons qu'une belle mode peut — et doit — être responsable.
                        Voici les principes qui guident chacune de nos créations.
                    </p>
                </div>

                <div className={styles.values}>
                    <div className={styles.value}>
                        <div className={styles.valueIcon} style={{ backgroundColor: '#4A7C59' }}>
                            <span>🌿</span>
                        </div>
                        <h2 className={styles.valueTitle}>Matières Responsables</h2>
                        <p className={styles.valueText}>
                            Nous sélectionnons nos tissus avec exigence : lin français, coton biologique,
                            laine mérinos certifiée, polyester recyclé. Chaque matière est choisie pour sa
                            qualité, sa durabilité et son impact environnemental réduit.
                        </p>
                    </div>

                    <div className={styles.value}>
                        <div className={styles.valueIcon} style={{ backgroundColor: '#3D4F5F' }}>
                            <span>✋</span>
                        </div>
                        <h2 className={styles.valueTitle}>Fabrication Artisanale</h2>
                        <p className={styles.valueText}>
                            Pas de production de masse. Chaque pièce est confectionnée en petite série ou
                            sur commande, dans notre atelier ou chez nos artisans partenaires en France.
                            Le temps de la confection est le temps de la qualité.
                        </p>
                    </div>

                    <div className={styles.value}>
                        <div className={styles.valueIcon} style={{ backgroundColor: '#C4943D' }}>
                            <span>♻</span>
                        </div>
                        <h2 className={styles.valueTitle}>Anti-gaspillage</h2>
                        <p className={styles.valueText}>
                            Notre modèle de production à la commande minimise les invendus et le gaspillage
                            textile. Les chutes de tissu sont réutilisées pour des accessoires ou données à
                            des associations de couture solidaire.
                        </p>
                    </div>

                    <div className={styles.value}>
                        <div className={styles.valueIcon} style={{ backgroundColor: '#722F37' }}>
                            <span>🤝</span>
                        </div>
                        <h2 className={styles.valueTitle}>Transparence</h2>
                        <p className={styles.valueText}>
                            Nous détaillons la composition de chaque pièce, son lieu de fabrication et les
                            conditions de travail de nos artisans. Notre prix reflète le coût réel d'une
                            production éthique et locale.
                        </p>
                    </div>
                </div>

                {/* Quote */}
                <div className={styles.quote}>
                    <blockquote className={styles.quoteText}>
                        « La vraie élégance, c'est de porter des vêtements qui respectent
                        ceux qui les fabriquent et le monde dans lequel nous vivons. »
                    </blockquote>
                    <cite className={styles.quoteAuthor}>— Arno Polynice</cite>
                </div>
            </section>
        </div>
    );
}
