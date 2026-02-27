import CategoryPage from '@/components/CategoryPage';
import { getProductsByCategory, getAvailableSubcategories } from '@/data/products';

export const metadata = {
    title: 'Unisexe — Arno Polynice',
    description: 'Découvrez les créations unisexe d\'Arno Polynice.',
};

export default async function UnisexePage() {
    const products = await getProductsByCategory('unisexe');
    const subcategories = await getAvailableSubcategories('unisexe');
    return <CategoryPage title="Unisexe" products={products} subcategories={subcategories} />;
}
