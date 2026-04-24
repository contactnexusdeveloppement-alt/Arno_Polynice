/**
 * Helpers i18n côté client.
 *
 * Ce module n'est volontairement pas un Provider ni un Context — il regroupe
 * juste des fonctions utilitaires qui s'appuient sur la fonction `t` exposée
 * par `useLanguage()`. À appeler depuis n'importe quel composant client qui a
 * déjà accès à `t`.
 */

/**
 * Convertit un nom de sous-catégorie Shopify (= productType côté Storefront)
 * vers son libellé traduit dans la langue courante.
 *
 * Convention de mapping :
 *   - On normalise le nom d'entrée : lowercase + suppression des accents.
 *   - On cherche `subcategories.<normalized>` dans les locales.
 *   - Si la clé n'existe pas, on retombe sur le nom brut Shopify (le client
 *     peut donc créer une nouvelle catégorie sans casser l'affichage : elle
 *     apparaîtra simplement non traduite jusqu'à ajout de la clé).
 *
 * Exemples :
 *   getSubcategoryLabel('Sacs', t)      → "Sacs" / "Bags" / "Bolsos"
 *   getSubcategoryLabel('Trousses', t)  → "Trousses" / "Toiletry bags" / "Neceseres"
 *   getSubcategoryLabel('Bracelets', t) → "Bracelets" (fallback brut, clé non définie)
 *   getSubcategoryLabel('', t)          → "" (no-op)
 *
 * @param {string} name Le nom Shopify brut (ex. "Sacs", "Vestes", "Trousses").
 * @param {(key: string) => string} t La fonction de traduction issue de `useLanguage()`.
 * @returns {string} Libellé traduit ou nom brut en fallback.
 */
export function getSubcategoryLabel(name, t) {
    if (!name) return '';
    const normalized = String(name)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // strip diacritics (é → e, à → a…)
        .trim();
    const key = `subcategories.${normalized}`;
    const translated = t(key);
    // `t()` retourne la clé brute si la traduction n'existe pas (cf. LanguageContext.js)
    return translated === key ? name : translated;
}
