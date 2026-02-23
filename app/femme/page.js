import CategoryPage from '@/components/CategoryPage';

export const metadata = {
    title: 'Femme — Arno Polynice',
    description: 'Découvrez la collection femme Arno Polynice. Ensembles, vestes, pantalons et accessoires confectionnés artisanalement en France.',
};

export default function FemmePage() {
    return <CategoryPage category="femme" title="Femme" />;
}
