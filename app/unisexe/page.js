import CategoryPage from '@/components/CategoryPage';
import { getProductsByCategory, getAvailableSubcategories } from '@/data/products';

export const metadata = {
    title: 'Collection Unisexe — Mode Sans Genre',
    description: 'Collection unisexe Arno Polynice : mode sans genre, confection artisanale française. Des pièces inclusives entre luxe abordable et streetwear contemporain.',
    alternates: { canonical: 'https://www.arno-polynice.com/unisexe' },
};

export default async function UnisexePage() {
    const products = await getProductsByCategory('unisexe');
    const subcategories = await getAvailableSubcategories('unisexe');
    return <CategoryPage title="Unisexe" products={products} subcategories={subcategories} />;
}
