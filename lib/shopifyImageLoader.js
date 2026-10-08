/**
 * Loader personnalisé pour next/image : le redimensionnement est délégué
 * au CDN Shopify au lieu de l'optimiseur d'images de Vercel.
 *
 * Pourquoi : sur le plan Vercel Hobby, l'optimisation d'images est plafonnée
 * à 5 000 transformations par mois. Au-delà, /_next/image répond 402 et le
 * navigateur affiche le texte alternatif à la place de l'image (constaté sur
 * www.arno-polynice.com en octobre 2026).
 *
 * Le CDN Shopify redimensionne gratuitement et sans quota via le paramètre
 * d'URL `width`, et sert automatiquement du WebP/AVIF aux navigateurs qui
 * l'acceptent. Toutes les images produits, collections et métaobjets du site
 * viennent de cdn.shopify.com, donc Vercel ne fait plus aucune transformation.
 *
 * Les images hors CDN Shopify (ex. /images/histoire/*.webp, déjà optimisées à
 * la main) sont renvoyées telles quelles : pour celles-là, passer `unoptimized`
 * au composant <Image> pour éviter un srcset inutile.
 *
 * Signature imposée par Next : ({ src, width, quality }) => string
 * (Shopify n'expose pas de paramètre de qualité, `quality` est ignoré.)
 */

const SHOPIFY_CDN_HOST = 'cdn.shopify.com';

// Largeur maximale acceptée par le CDN Shopify pour une transformation.
const SHOPIFY_MAX_WIDTH = 5760;

export default function shopifyImageLoader({ src, width }) {
    let url;
    try {
        url = new URL(src);
    } catch {
        // Chemin relatif (image locale dans /public) : servie telle quelle.
        return src;
    }

    if (url.hostname !== SHOPIFY_CDN_HOST) {
        return src;
    }

    // Conserve les paramètres existants (ex. ?v=1776901353, utilisé par
    // Shopify pour invalider son cache) et remplace un éventuel `width`.
    url.searchParams.set('width', String(Math.min(width, SHOPIFY_MAX_WIDTH)));

    return url.toString();
}
