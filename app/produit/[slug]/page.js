import { getProductBySlug } from '@/data/products';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import { SITE_URL, ORG_ID } from '@/lib/schemas';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return { title: 'Produit non trouvé' };
    }

    const url = `${SITE_URL}/produit/${product.slug}`;
    const image = product.images?.[0] || `${SITE_URL}/og-image.png`;
    // FIX duplicata title : on retourne juste product.name. Le template global
    // (`%s | Arno Polynice` dans app/layout.js) suffira sinon on aurait
    // "Ensemble Dark — Arno Polynice | Arno Polynice" en double.
    const title = product.name;
    const description = product.description?.slice(0, 160) || `${product.name}, pièce artisanale Arno Polynice confectionnée à Épinal dans les Vosges.`;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            // FIX og:type → 'product' (au lieu de 'website') pour rich pins
            // Pinterest/Facebook et signal correct aux crawlers e-commerce.
            type: 'website', // Note : 'product' n'est pas dans l'enum officiel Next.js Metadata, on garde 'website' jusqu'à passage à Next.js Open Graph product type custom
            url,
            title: `${product.name} — Arno Polynice`,
            description,
            siteName: 'Arno Polynice',
            locale: 'fr_FR',
            images: [{ url: image, width: 1200, height: 1200, alt: product.name }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product.name} — Arno Polynice`,
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

    // priceValidUntil : 1 an à partir de maintenant (recommandé Google Merchant)
    const priceValidUntil = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString().split('T')[0];

    // handlingTime : varie selon disponibilité (2-4 semaines pour made_to_order)
    const handlingTimeRange = product.availability === 'made_to_order'
        ? { minValue: 14, maxValue: 28 }
        : { minValue: 2, maxValue: 5 };

    /**
     * Product schema enrichi :
     *   - countryOfOrigin: France (signal Made in France pour Google Shopping)
     *   - manufacturer: → Organization @id (cohérence graphe)
     *   - priceValidUntil: requis pour merchant listing
     *   - shippingDetails + hasMerchantReturnPolicy: requis pour les rich
     *     results "Produit avec livraison" depuis 2022
     *   - inLanguage sur l'offer pour le contexte i18n
     */
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': `${url}#product`,
        name: product.name,
        description: product.description,
        image: product.images?.length ? product.images : [`${SITE_URL}/og-image.png`],
        sku: product.slug,
        brand: {
            '@type': 'Brand',
            name: 'Arno Polynice',
            logo: `${SITE_URL}/icon.svg`,
        },
        category: product.category,
        countryOfOrigin: { '@type': 'Country', name: 'France' },
        manufacturer: { '@id': ORG_ID },
        offers: {
            '@type': 'Offer',
            '@id': `${url}#offer`,
            url,
            priceCurrency: 'EUR',
            price: String(product.price),
            priceValidUntil,
            availability: availabilityMap[product.availability] || 'https://schema.org/InStock',
            seller: { '@id': ORG_ID },
            itemCondition: 'https://schema.org/NewCondition',
            shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingRate: {
                    '@type': 'MonetaryAmount',
                    value: '0',
                    currency: 'EUR',
                },
                shippingDestination: [
                    { '@type': 'DefinedRegion', addressCountry: 'FR' },
                    { '@type': 'DefinedRegion', addressCountry: 'BE' },
                    { '@type': 'DefinedRegion', addressCountry: 'CH' },
                ],
                deliveryTime: {
                    '@type': 'ShippingDeliveryTime',
                    handlingTime: {
                        '@type': 'QuantitativeValue',
                        ...handlingTimeRange,
                        unitCode: 'DAY',
                    },
                    transitTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 2,
                        maxValue: 5,
                        unitCode: 'DAY',
                    },
                },
            },
            hasMerchantReturnPolicy: {
                '@type': 'MerchantReturnPolicy',
                applicableCountry: 'FR',
                returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                merchantReturnDays: 14,
                returnMethod: 'https://schema.org/ReturnByMail',
                returnFees: 'https://schema.org/ReturnShippingFees',
            },
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
