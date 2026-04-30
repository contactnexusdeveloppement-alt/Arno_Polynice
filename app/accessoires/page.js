import AccessoriesContent from '@/components/AccessoriesContent';
import { getAccessories } from '@/data/products';
import {
    SITE_URL,
    getCollectionPageSchema,
    getBreadcrumbSchema,
    jsonLdScriptProps,
} from '@/lib/schemas';

export const metadata = {
    title: 'Accessoires — Sacs, Trousses, Lunettes & Ceintures',
    description: 'Accessoires Arno Polynice : sacs, trousses, lunettes et ceintures pour femme, homme et unisexe. Pièces artisanales confectionnées à Épinal dans les Vosges.',
    alternates: { canonical: `${SITE_URL}/accessoires` },
};

const collectionSchema = getCollectionPageSchema({
    slug: 'accessoires',
    name: 'Accessoires — Arno Polynice',
    description: 'Sacs, trousses, lunettes et ceintures artisanaux confectionnés à Épinal dans les Vosges.',
});

const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', url: SITE_URL },
    { name: 'Accessoires', url: `${SITE_URL}/accessoires` },
]);

export default async function AccessoiresPage() {
    const products = await getAccessories();
    return (
        <>
            <script {...jsonLdScriptProps(collectionSchema)} />
            <script {...jsonLdScriptProps(breadcrumbSchema)} />
            <AccessoriesContent products={products} />
        </>
    );
}
