import CategoryPage from '@/components/CategoryPage';
import { getProductsByCategory, getAvailableSubcategories } from '@/data/products';

export const metadata = {
    title: 'Femme — Arno Polynice',
    description: 'Découvrez les créations pour femme d\'Arno Polynice.',
};

export default async function FemmePage() {
    const products = await getProductsByCategory('femme');
    const subcategories = await getAvailableSubcategories('femme');
    return <CategoryPage title="Femme" products={products} subcategories={subcategories} />;
}
