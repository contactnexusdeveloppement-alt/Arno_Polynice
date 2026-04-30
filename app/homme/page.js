import CategoryPage from '@/components/CategoryPage';
import { getProductsByCategory, getAvailableSubcategories } from '@/data/products';
import {
    SITE_URL,
    getCollectionPageSchema,
    getBreadcrumbSchema,
    jsonLdScriptProps,
} from '@/lib/schemas';

export const metadata = {
    title: 'Collection Homme — Mode Artisanale Vosges',
    description: 'Collection homme Arno Polynice : streetwear artisanal, sur mesure et luxe abordable. Vêtements confectionnés à Épinal dans les Vosges.',
    alternates: { canonical: `${SITE_URL}/homme` },
};

const collectionSchema = getCollectionPageSchema({
    slug: 'homme',
    name: 'Collection Homme — Arno Polynice',
    description: 'Streetwear artisanal pour homme confectionné à Épinal dans les Vosges. Pièces uniques entre luxe abordable et style contemporain.',
});

const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', url: SITE_URL },
    { name: 'Homme', url: `${SITE_URL}/homme` },
]);

export default async function HommePage() {
    const products = await getProductsByCategory('homme');
    const subcategories = await getAvailableSubcategories('homme');
    return (
        <>
            <script {...jsonLdScriptProps(collectionSchema)} />
            <script {...jsonLdScriptProps(breadcrumbSchema)} />
            <CategoryPage title="Homme" products={products} subcategories={subcategories} />
        </>
    );
}
