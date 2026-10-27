/**
 * Formate un montant en euros au format français : 89 → "89,00 €", 89.9 → "89,90 €".
 *
 * Remplace l'ancien affichage `{price},00 €` qui tronquait les centimes
 * (un article à 89,90 € s'affichait 89,00 € alors que Shopify encaissait 89,90 €).
 */
const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
});

export function formatPrice(amount) {
    return formatter.format(Number(amount) || 0);
}
