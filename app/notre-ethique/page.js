import { getEthicsPage, getEthicsValues } from '@/lib/shopify';
import EthicsContent from './EthicsContent';

// ISR : Adelson peut modifier le contenu Shopify et le voir en ligne en
// quelques minutes max, sans rebuild manuel.
export const revalidate = 300;

export const metadata = {
    title: 'Notre Éthique — Mode Responsable et Artisanale',
    description: 'Les engagements d\'Arno Polynice : confection éthique, matériaux responsables, production locale dans les Vosges. Une mode artisanale respectueuse de l\'environnement.',
    alternates: { canonical: 'https://www.arno-polynice.com/notre-ethique' },
};

// Fallback statique : si Shopify est down au moment du SSR, on garde un
// contenu FR par défaut pour que la page reste fonctionnelle. Ce fallback
// ne doit JAMAIS être visible en pratique — Shopify est la source de vérité
// gérée par Adelson via les metaobjects ethics_page + ethics_value.
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

/**
 * Server component : fetch le contenu Shopify en FR (SSR + ISR pour SEO et
 * perf), puis délègue le rendu à EthicsContent (client) qui re-fetch en
 * EN/ES si l'utilisateur change de langue (cf. /api/ethics).
 *
 * Adelson reste maître du contenu via Shopify metaobjects. Pour que les
 * traductions EN/ES s'affichent : installer l'app Shopify "Translate &
 * Adapt" (gratuite) et traduire chaque champ depuis le panel Shopify.
 */
export default async function NotreEthiquePage() {
    const [pageData, valuesData] = await Promise.all([
        getEthicsPage('fr'),
        getEthicsValues('fr'),
    ]);

    const initialPage = pageData ?? FALLBACK_PAGE;
    const initialValues = valuesData?.length > 0 ? valuesData : FALLBACK_VALUES;

    return <EthicsContent initialPage={initialPage} initialValues={initialValues} />;
}
