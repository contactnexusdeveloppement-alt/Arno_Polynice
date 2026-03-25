import CategoryPage from '@/components/CategoryPage';
import { getProductsByCategory, getAvailableSubcategories } from '@/data/products';

export const metadata = {
    title: 'Collection Homme — Mode Artisanale Française',
    description: 'Découvrez la collection homme Arno Polynice : streetwear artisanal et luxe abordable. Vêtements confectionnés en France par un créateur des Vosges.',
    alternates: { canonical: 'https://www.arno-polynice.com/homme' },
};

export default async function HommePage() {
    const products = await getProductsByCategory('homme');
    const subcategories = await getAvailableSubcategories('homme');
    return <CategoryPage title="Homme" products={products} subcategories={subcategories} />;
}
