import { NextResponse } from 'next/server';

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function POST(req) {
    try {
        const { items } = await req.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Panier vide' }, { status: 400 });
        }

        // Filter items that have a Shopify variant ID
        const lines = items
            .filter(item => item.variantId)
            .map(item => ({
                merchandiseId: item.variantId,
                quantity: item.quantity,
            }));

        if (lines.length === 0) {
            return NextResponse.json({ error: 'Aucun produit Shopify dans le panier' }, { status: 400 });
        }

        // Use the Cart API (cartCreate) instead of the deprecated Checkout API
        const mutation = `
            mutation cartCreate($input: CartInput!) {
                cartCreate(input: $input) {
                    cart {
                        id
                        checkoutUrl
                    }
                    userErrors {
                        code
                        field
                        message
                    }
                }
            }
        `;

        const variables = {
            input: {
                lines,
            },
        };

        const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
            },
            body: JSON.stringify({ query: mutation, variables }),
        });

        const data = await response.json();

        if (data.errors) {
            console.error('Shopify GraphQL errors:', data.errors);
            return NextResponse.json({ error: 'Erreur lors de la création du paiement' }, { status: 500 });
        }

        const cart = data.data?.cartCreate?.cart;
        const userErrors = data.data?.cartCreate?.userErrors;

        if (userErrors && userErrors.length > 0) {
            console.error('Cart user errors:', userErrors);
            return NextResponse.json({ error: userErrors[0].message }, { status: 400 });
        }

        if (!cart?.checkoutUrl) {
            console.error('No checkout URL in response:', JSON.stringify(data));
            return NextResponse.json({ error: 'Impossible de créer le paiement' }, { status: 500 });
        }

        // Replace custom domain with myshopify.com domain for checkout
        // The custom domain points to Vercel which can't handle Shopify checkout
        let checkoutUrl = cart.checkoutUrl;
        checkoutUrl = checkoutUrl.replace(
            /https?:\/\/[^/]+/,
            `https://${SHOPIFY_DOMAIN}`
        );

        return NextResponse.json({ checkoutUrl });
    } catch (error) {
        console.error('Checkout error:', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}
