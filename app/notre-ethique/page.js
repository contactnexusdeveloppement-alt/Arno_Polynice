import styles from './page.module.css';
import { getEthicsPage, getEthicsValues } from '@/lib/shopify';

// Revalidation toutes les 5 min : permet au client de modifier le contenu Shopify
// et de le voir en ligne en quelques minutes (sans rebuild manuel).
export const revalidate = 300;

export const metadata = {
    title: 'Notre Éthique — Mode Responsable et Artisanale',
    description: 'Les engagements d\'Arno Polynice : confection éthique, matériaux responsables, production locale dans les Vosges. Une mode artisanale respectueuse de l\'environnement.',
    alternates: { canonical: 'https://www.arno-polynice.com/notre-ethique' },
};

// Fallback statique : si Shopify est down ou les metaobjects sont vides,
// on garde le contenu d'origine pour que la page reste fonctionnelle.
const FALLBACK_PAGE = {
    label: 'Nos engagements',
    title: 'Notre Éthique',
    intro: 'Nous croyons qu\'une belle mode peut — et doit — être responsable. Voici les principes qui guident chacune de nos créations.',
    quoteText: 'La vraie élégance, c\'est de porter des vêtements qui respectent ceux qui les fabriquent et le monde dans lequel nous vivons.',
    quoteAuthor: 'Arno Polynice',
};

const FALLBACK_VALUES = [
    {
        position: 1,
        number: '01',
        title: 'Matières Responsables',
        text: 'Nous sélectionnons nos tissus avec exigence : lin français, coton biologique, laine mérinos certifiée, polyester recyclé. Chaque matière est choisie pour sa qualité, sa durabilité et son impact environnemental réduit.',
    },
    {
        position: 2,
        number: '02',
        title: 'Fabrication Artisanale',
        text: 'Pas de production de masse. Chaque pièce est confectionnée en petite série ou sur commande, dans notre atelier ou chez nos artisans partenaires en France. Le temps de la confection est le temps de la qualité.',
    },
    {
        position: 3,
        number: '03',
        title: 'Anti-gaspillage',
        text: 'Notre modèle de production à la commande minimise les invendus et le gaspillage textile. Les chutes de tissu sont réutilisées pour des accessoires ou données à des associations de couture solidaire.',
    },
    {
        position: 4,
        number: '04',
        title: 'Transparence',
        text: 'Nous détaillons la composition de chaque pièce, son lieu de fabrication et les conditions de travail de nos artisans. Notre prix reflète le coût réel d\'une production éthique et locale.',
    },
];

export default async function NotreEthiquePage() {
    // Fetch en parallèle, fallback statique si Shopify indisponible ou vide
    const [pageData, valuesData] = await Promise.all([
        getEthicsPage(),
        getEthicsValues(),
    ]);

    const page = pageData ?? FALLBACK_PAGE;
    const values = valuesData?.length > 0 ? valuesData : FALLBACK_VALUES;

    return (
        <div className="page-enter">
            <section className={styles.ethicsPage}>
                <div className={styles.header}>
                    <span className={styles.label}>{page.label}</span>
                    <h1 className={styles.title}>{page.title}</h1>
                    <p className={styles.intro}>{page.intro}</p>
                </div>

                <div className={styles.values}>
                    {values.map((value) => (
                        <div key={value.position || value.number} className={styles.value}>
                            <span className={styles.valueNumber} aria-hidden="true">{value.number}</span>
                            <h2 className={styles.valueTitle}>{value.title}</h2>
                            <p className={styles.valueText}>{value.text}</p>
                        </div>
                    ))}
                </div>

                {/* Quote */}
                <div className={styles.quote}>
                    <blockquote className={styles.quoteText}>
                        « {page.quoteText} »
                    </blockquote>
                    <cite className={styles.quoteAuthor}>— {page.quoteAuthor}</cite>
                </div>
            </section>
        </div>
    );
}
