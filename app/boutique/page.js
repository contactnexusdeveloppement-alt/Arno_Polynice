import CategoryPage from '@/components/CategoryPage';
import { getAllProducts } from '@/data/products';

export const metadata = {
    title: 'Boutique — Toutes les Créations Arno Polynice',
    description: 'Parcourez toutes les créations Arno Polynice. Mode artisanale française, pièces uniques confectionnées avec passion à Épinal dans les Vosges. Femme, homme, unisexe.',
    alternates: { canonical: 'https://www.arno-polynice.com/boutique' },
};

export default async function BoutiquePage() {
    const products = await getAllProducts();

    // Collect unique subcategories from all products
    const subcategories = [...new Set(
        products
            .map(p => p.subcategory)
            .filter(Boolean)
    )];

    // CategoryPage résout le titre via la clé i18n `categories.<title-en-minuscules>`.
    // Pour /boutique on utilise `boutique` comme clé → traduit dans les 3 langues.
    return <CategoryPage title="Boutique" products={products} subcategories={subcategories} />;
}
