import { getProductBySlug } from '@/data/products';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';

const SITE_URL = 'https://www.arno-polynice.com';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return { title: 'Produit non trouvé' };
    }

    const url = `${SITE_URL}/produit/${product.slug}`;
    const image = product.images?.[0] || `${SITE_URL}/og-image.png`;
    const title = `${product.name} — Arno Polynice`;
    const description = product.description?.slice(0, 160) || `Découvrez ${product.name}, pièce artisanale Arno Polynice confectionnée en France.`;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            type: 'website',
            url,
            title,
            description,
            siteName: 'Arno Polynice',
            locale: 'fr_FR',
            images: [{ url: image, width: 1200, height: 1200, alt: product.name }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    };
}

export default async function ProductPage({ params }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) return notFound();

    const url = `${SITE_URL}/produit/${product.slug}`;
    const availabilityMap = {
        available: 'https://schema.org/InStock',
        made_to_order: 'https://schema.org/MadeToOrder',
        waiting_materials: 'https://schema.org/PreOrder',
        unavailable: 'https://schema.org/OutOfStock',
    };

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.images?.length ? product.images : [`${SITE_URL}/og-image.png`],
        sku: product.slug,
        brand: { '@type': 'Brand', name: 'Arno Polynice' },
        category: product.category,
        offers: {
            '@type': 'Offer',
            url,
            priceCurrency: 'EUR',
            price: String(product.price),
            availability: availabilityMap[product.availability] || 'https://schema.org/InStock',
            seller: { '@type': 'Organization', name: 'Arno Polynice' },
            itemCondition: 'https://schema.org/NewCondition',
        },
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: product.category, item: `${SITE_URL}/${product.category}` },
            { '@type': 'ListItem', position: 3, name: product.name, item: url },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ProductDetail product={product} />
        </>
    );
}
