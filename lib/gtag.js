/**
 * Helper safe pour envoyer des events vers Google Analytics 4 (gtag.js).
 *
 * - Vérifie l'existence de window.gtag avant chaque appel (évite les
 *   erreurs si l'utilisateur a refusé les cookies analytics ou si le
 *   script n'est pas encore chargé).
 *
 * - Toutes les fonctions sont des no-ops silencieux quand gtag n'existe
 *   pas → safe à appeler partout dans l'app sans guard côté caller.
 *
 * Documentation events e-commerce GA4 :
 * https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
 */

function isGtagAvailable() {
    return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

/**
 * Envoie un event générique GA4. Utilisé par tous les helpers e-commerce
 * ci-dessous.
 */
export function gtagEvent(eventName, params = {}) {
    if (!isGtagAvailable()) return;
    window.gtag('event', eventName, params);
}

/**
 * Envoie un event view_item (vue d'une page produit).
 * @param {object} product - { id, name, price, category, slug }
 */
export function trackViewItem(product) {
    if (!product) return;
    gtagEvent('view_item', {
        currency: 'EUR',
        value: Number(product.price) || 0,
        items: [{
            item_id: product.slug || product.id,
            item_name: product.name,
            item_category: product.category,
            item_brand: 'Arno Polynice',
            price: Number(product.price) || 0,
            quantity: 1,
        }],
    });
}

/**
 * Envoie un event view_item_list (vue d'une page catégorie/collection).
 * @param {string} listName - ex: "Femme", "Homme", "Accessoires"
 * @param {array} products - liste de produits visibles
 */
export function trackViewItemList(listName, products) {
    if (!Array.isArray(products) || products.length === 0) return;
    gtagEvent('view_item_list', {
        item_list_name: listName,
        items: products.slice(0, 20).map((p, idx) => ({
            item_id: p.slug || p.id,
            item_name: p.name,
            item_category: p.category,
            item_brand: 'Arno Polynice',
            price: Number(p.price) || 0,
            index: idx,
        })),
    });
}

/**
 * Envoie un event add_to_cart.
 * @param {object} product - le produit
 * @param {object} options - { color, size, quantity }
 */
export function trackAddToCart(product, { color, size, quantity = 1 } = {}) {
    if (!product) return;
    const value = (Number(product.price) || 0) * quantity;
    gtagEvent('add_to_cart', {
        currency: 'EUR',
        value,
        items: [{
            item_id: product.slug || product.id,
            item_name: product.name,
            item_category: product.category,
            item_brand: 'Arno Polynice',
            ...(color ? { item_variant: `${color}/${size}` } : {}),
            price: Number(product.price) || 0,
            quantity,
        }],
    });
}

/**
 * Envoie un event begin_checkout (clic sur "Procéder au paiement").
 * @param {array} items - le contenu du panier
 * @param {number} totalValue - somme totale
 */
export function trackBeginCheckout(items, totalValue) {
    if (!Array.isArray(items) || items.length === 0) return;
    gtagEvent('begin_checkout', {
        currency: 'EUR',
        value: Number(totalValue) || 0,
        items: items.map(item => ({
            item_id: item.slug || item.id,
            item_name: item.name,
            item_brand: 'Arno Polynice',
            ...(item.color ? { item_variant: `${item.color}/${item.size}` } : {}),
            price: Number(item.price) || 0,
            quantity: item.quantity || 1,
        })),
    });
}
