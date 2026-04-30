import CategoryPage from '@/components/CategoryPage';
import { getAllProducts } from '@/data/products';
import {
    SITE_URL,
    getCollectionPageSchema,
    getBreadcrumbSchema,
    jsonLdScriptProps,
} from '@/lib/schemas';

export const metadata = {
    title: 'Boutique — Toutes les Créations Arno Polynice',
    description: 'Toutes les créations Arno Polynice : mode artisanale française, pièces uniques confectionnées à Épinal dans les Vosges. Femme, homme, unisexe et accessoires.',
    alternates: { canonical: `${SITE_URL}/boutique` },
};

const collectionSchema = getCollectionPageSchema({
    slug: 'boutique',
    name: 'Boutique Arno Polynice — Toutes les créations',
    description: 'Catalogue complet : femme, homme, unisexe et accessoires. Pièces artisanales confectionnées à Épinal dans les Vosges.',
});

const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', url: SITE_URL },
    { name: 'Boutique', url: `${SITE_URL}/boutique` },
]);

export default async function BoutiquePage() {
    const products = await getAllProducts();

    // Collect unique subcategories from all products
    const subcategories = [...new Set(
        products
            .map(p => p.subcategory)
            .filter(Boolean)
    )];

    // CategoryPage résout le titre via la clé i18n `categories.<title-en-minuscules>`.
    return (
        <>
            <script {...jsonLdScriptProps(collectionSchema)} />
            <script {...jsonLdScriptProps(breadcrumbSchema)} />
            <CategoryPage title="Boutique" products={products} subcategories={subcategories} />
        </>
    );
}
