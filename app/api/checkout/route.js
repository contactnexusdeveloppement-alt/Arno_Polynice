import { NextResponse } from 'next/server';

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Timeout Shopify : au-delà, on préfère afficher un message clair au client
// plutôt que de bloquer l'UI indéfiniment.
const SHOPIFY_TIMEOUT_MS = 10_000;

// Codes d'erreur renvoyés au frontend (mappés en i18n côté CartDrawer).
// Toute erreur métier est exprimée via un code, jamais un message en dur
// pour garantir la traduction FR/EN/ES.
const ERROR_CODES = {
    EMPTY_CART: 'emptyCart',
    NO_SHOPIFY_VARIANTS: 'noVariants',
    TIMEOUT: 'timeout',
    OUT_OF_STOCK: 'outOfStock',
    CHECKOUT_CREATE_FAILED: 'checkoutCreateFailed',
    SERVER_ERROR: 'serverError',
};

// Détection d'erreurs Shopify connues → mapping vers un code applicatif.
// On regarde d'abord les codes Shopify officiels, puis on fallback sur le message
// pour attraper quelques libellés fréquents quand Shopify n'envoie pas de code.
function classifyShopifyError(userErrors) {
    if (!userErrors?.length) return null;
    const first = userErrors[0];
    const code = (first.code || '').toString().toUpperCase();
    const msg = (first.message || '').toLowerCase();
    if (code.includes('OUT_OF_STOCK') || msg.includes('out of stock') || msg.includes('sold out')) {
        return ERROR_CODES.OUT_OF_STOCK;
    }
    if (code.includes('MERCHANDISE') || msg.includes('merchandise') || msg.includes('variant')) {
        return ERROR_CODES.OUT_OF_STOCK;
    }
    return ERROR_CODES.CHECKOUT_CREATE_FAILED;
}

export async function POST(req) {
    try {
        const { items } = await req.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ error: ERROR_CODES.EMPTY_CART }, { status: 400 });
        }

        // On ne garde que les items avec un variantId Shopify
        const lines = items
            .filter(item => item.variantId)
            .map(item => ({
                merchandiseId: item.variantId,
                quantity: item.quantity,
            }));

        if (lines.length === 0) {
            return NextResponse.json({ error: ERROR_CODES.NO_SHOPIFY_VARIANTS }, { status: 400 });
        }

        // Cart API (remplace l'ancienne Checkout API dépréciée)
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

        const variables = { input: { lines } };

        // Timeout via AbortSignal : si Shopify ne répond pas en 10s,
        // on renvoie un code TIMEOUT pour afficher un message UX clair.
        let response;
        try {
            response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2025-01/graphql.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
                },
                body: JSON.stringify({ query: mutation, variables }),
                signal: AbortSignal.timeout(SHOPIFY_TIMEOUT_MS),
            });
        } catch (fetchError) {
            if (fetchError.name === 'TimeoutError' || fetchError.name === 'AbortError') {
                console.error('[checkout] Shopify timeout after', SHOPIFY_TIMEOUT_MS, 'ms');
                return NextResponse.json({ error: ERROR_CODES.TIMEOUT }, { status: 504 });
            }
            console.error('[checkout] Fetch error:', fetchError);
            return NextResponse.json({ error: ERROR_CODES.SERVER_ERROR }, { status: 500 });
        }

        const data = await response.json();

        if (data.errors) {
            console.error('[checkout] Shopify GraphQL errors:', data.errors);
            return NextResponse.json(
                { error: ERROR_CODES.CHECKOUT_CREATE_FAILED },
                { status: 500 }
            );
        }

        const cart = data.data?.cartCreate?.cart;
        const userErrors = data.data?.cartCreate?.userErrors;

        if (userErrors && userErrors.length > 0) {
            console.error('[checkout] Cart user errors:', userErrors);
            return NextResponse.json(
                { error: classifyShopifyError(userErrors) || ERROR_CODES.CHECKOUT_CREATE_FAILED },
                { status: 400 }
            );
        }

        if (!cart?.checkoutUrl) {
            console.error('[checkout] No checkout URL in response:', JSON.stringify(data));
            return NextResponse.json(
                { error: ERROR_CODES.CHECKOUT_CREATE_FAILED },
                { status: 500 }
            );
        }

        // Remplace le domaine custom par le domaine myshopify.com pour le checkout :
        // le domaine custom pointe sur Vercel qui ne sait pas servir le checkout Shopify.
        let checkoutUrl = cart.checkoutUrl;
        checkoutUrl = checkoutUrl.replace(
            /https?:\/\/[^/]+/,
            `https://${SHOPIFY_DOMAIN}`
        );

        return NextResponse.json({ checkoutUrl });
    } catch (error) {
        console.error('[checkout] Unexpected error:', error);
        return NextResponse.json({ error: ERROR_CODES.SERVER_ERROR }, { status: 500 });
    }
}
