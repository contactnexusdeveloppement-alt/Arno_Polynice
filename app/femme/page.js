import CategoryPage from '@/components/CategoryPage';
import { getProductsByCategory, getAvailableSubcategories } from '@/data/products';

export const metadata = {
    title: 'Collection Femme — Mode Artisanale Française',
    description: 'Explorez la collection femme Arno Polynice : vêtements artisanaux confectionnés en France. Pièces uniques mêlant élégance et streetwear, créées dans les Vosges.',
    alternates: { canonical: 'https://www.arno-polynice.com/femme' },
};

export default async function FemmePage() {
    const products = await getProductsByCategory('femme');
    const subcategories = await getAvailableSubcategories('femme');
    return <CategoryPage title="Femme" products={products} subcategories={subcategories} />;
}
