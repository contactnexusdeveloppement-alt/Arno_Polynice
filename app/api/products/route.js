import { getAllProducts, getProductBySlug } from '@/data/products';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('lang') || 'fr';
    const slug = searchParams.get('slug');

    try {
        if (slug) {
            const product = await getProductBySlug(slug, language);
            return NextResponse.json({ product });
        }

        const products = await getAllProducts(language);
        return NextResponse.json({ products });
    } catch (error) {
        console.error('[API /products] Error:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}
