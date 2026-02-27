import CategoryPage from '@/components/CategoryPage';
import { getProductsByCategory, getAvailableSubcategories } from '@/data/products';

export const metadata = {
    title: 'Homme — Arno Polynice',
    description: 'Découvrez les créations pour homme d\'Arno Polynice.',
};

export default async function HommePage() {
    const products = await getProductsByCategory('homme');
    const subcategories = await getAvailableSubcategories('homme');
    return <CategoryPage title="Homme" products={products} subcategories={subcategories} />;
}
