import AccessoriesContent from '@/components/AccessoriesContent';
import { getAccessories } from '@/data/products';

export const metadata = {
    title: 'Accessoires — Ceintures, Trousses & Lunettes | Arno Polynice',
    description: 'Découvrez la collection accessoires Arno Polynice : ceintures, trousses de toilette et lunettes pour femme, homme et unisexe. Pièces artisanales confectionnées en France.',
    alternates: { canonical: 'https://www.arno-polynice.com/accessoires' },
};

export default async function AccessoiresPage() {
    const products = await getAccessories();
    return <AccessoriesContent products={products} />;
}
