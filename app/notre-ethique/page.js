import EthicsContent from './EthicsContent';

export const metadata = {
    title: 'Notre Éthique — Mode Responsable et Artisanale',
    description: 'Les engagements d\'Arno Polynice : confection éthique, matériaux responsables, production locale dans les Vosges. Une mode artisanale respectueuse de l\'environnement.',
    alternates: { canonical: 'https://www.arno-polynice.com/notre-ethique' },
};

/**
 * Server wrapper : conserve l'export `metadata` pour le SEO + délègue le
 * rendu à EthicsContent (client) qui sait utiliser useLanguage().
 *
 * Note : on n'utilise plus les metaobjects Shopify ethics_page /
 * ethics_value (cf. EthicsContent pour la rationale).
 */
export default function NotreEthiquePage() {
    return <EthicsContent />;
}
