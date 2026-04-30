import CategoryPage from '@/components/CategoryPage';
import { getProductsByCategory, getAvailableSubcategories } from '@/data/products';
import {
    SITE_URL,
    getCollectionPageSchema,
    getBreadcrumbSchema,
    jsonLdScriptProps,
} from '@/lib/schemas';

export const metadata = {
    title: 'Collection Unisexe — Mode Sans Genre Vosges',
    description: 'Collection unisexe Arno Polynice : mode sans genre, confection artisanale française. Pièces inclusives entre luxe abordable et streetwear, faites à Épinal.',
    alternates: { canonical: `${SITE_URL}/unisexe` },
};

const collectionSchema = getCollectionPageSchema({
    slug: 'unisexe',
    name: 'Collection Unisexe — Arno Polynice',
    description: 'Mode sans genre artisanale confectionnée à Épinal dans les Vosges. Pièces inclusives entre luxe abordable et streetwear contemporain.',
});

const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', url: SITE_URL },
    { name: 'Unisexe', url: `${SITE_URL}/unisexe` },
]);

export default async function UnisexePage() {
    const products = await getProductsByCategory('unisexe');
    const subcategories = await getAvailableSubcategories('unisexe');
    return (
        <>
            <script {...jsonLdScriptProps(collectionSchema)} />
            <script {...jsonLdScriptProps(breadcrumbSchema)} />
            <CategoryPage title="Unisexe" products={products} subcategories={subcategories} />
        </>
    );
}
