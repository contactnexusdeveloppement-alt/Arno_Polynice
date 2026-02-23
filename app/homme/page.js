import CategoryPage from '@/components/CategoryPage';

export const metadata = {
    title: 'Homme — Arno Polynice',
    description: 'Découvrez la collection homme Arno Polynice. Vestes, pantalons et ensembles confectionnés artisanalement en France.',
};

export default function HommePage() {
    return <CategoryPage category="homme" title="Homme" />;
}
