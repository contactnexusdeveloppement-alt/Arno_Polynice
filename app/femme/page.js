import CategoryPage from '@/components/CategoryPage';
import { getProductsByCategory, getAvailableSubcategories } from '@/data/products';
import {
    SITE_URL,
    getCollectionPageSchema,
    getBreadcrumbSchema,
    jsonLdScriptProps,
} from '@/lib/schemas';

export const metadata = {
    title: 'Collection Femme — Mode Artisanale Vosges',
    description: 'Collection femme Arno Polynice : vêtements artisanaux confectionnés à Épinal dans les Vosges. Pièces uniques mêlant élégance, sur mesure et streetwear.',
    alternates: { canonical: `${SITE_URL}/femme` },
};

const collectionSchema = getCollectionPageSchema({
    slug: 'femme',
    name: 'Collection Femme — Arno Polynice',
    description: 'Vêtements artisanaux pour femme confectionnés à Épinal dans les Vosges. Pièces uniques mêlant élégance et streetwear.',
});

const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', url: SITE_URL },
    { name: 'Femme', url: `${SITE_URL}/femme` },
]);

export default async function FemmePage() {
    const products = await getProductsByCategory('femme');
    const subcategories = await getAvailableSubcategories('femme');
    return (
        <>
            <script {...jsonLdScriptProps(collectionSchema)} />
            <script {...jsonLdScriptProps(breadcrumbSchema)} />
            <CategoryPage title="Femme" products={products} subcategories={subcategories} />
        </>
    );
}
