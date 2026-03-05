import CategoryPage from '@/components/CategoryPage';
import { getAllProducts } from '@/data/products';

export const metadata = {
    title: 'Boutique — Arno Polynice',
    description: 'Découvrez toutes les créations Arno Polynice. Mode artisanale française, pièces uniques confectionnées avec passion.',
};

export default async function BoutiquePage() {
    const products = await getAllProducts();

    // Collect unique subcategories from all products
    const subcategories = [...new Set(
        products
            .map(p => p.subcategory)
            .filter(Boolean)
    )];

    return <CategoryPage title="Toute la Collection" products={products} subcategories={subcategories} />;
}
