import { getProductBySlug } from '@/data/products';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';

export async function generateMetadata({ params }) {
    // Await params if needed by Next.js 15+ convention, but standard for App Router is direct access
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return { title: 'Produit non trouvé — Arno Polynice' };
    }

    return {
        title: `${product.name} — Arno Polynice`,
        description: product.description,
    };
}

export default async function ProductPage({ params }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) return notFound();

    return <ProductDetail product={product} />;
}
