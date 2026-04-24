import { getProducts as fetchShopifyProducts, getProduct as fetchShopifyProduct } from '@/lib/shopify';

export const categories = [
  { id: 'femme', name: 'Femme', slug: 'femme' },
  { id: 'homme', name: 'Homme', slug: 'homme' },
  { id: 'unisexe', name: 'Unisexe', slug: 'unisexe' },
];

export const subcategories = [
  'Ensembles',
  'Vestes',
  'Pantalons',
  'Shorts',
  'Chemises',
  'Accessoires',
];

export const availabilityStatuses = {
  available: { label: 'Disponible', color: '#4A7C59', icon: '✓' },
  made_to_order: { label: 'À confectionner', color: '#C4943D', icon: '✂', delay: 'Délai de confection : 2 à 4 semaines' },
  waiting_materials: { label: 'En attente de matériaux', color: '#8A6D3B', icon: '⏳', delay: 'Délai variable selon approvisionnement' },
  unavailable: { label: 'Non disponible', color: '#A63D40', icon: '✕' },
};

// Color mapping for Shopify product options
const colorMap = {
  'noir': '#1A1A1A',
  'black': '#1A1A1A',
  'blanc': '#FFFFFF',
  'white': '#FFFFFF',
  'beige': '#D4C5B2',
  'bleu nuit': '#2C3E50',
  'kaki': '#5C5C3D',
  'sable': '#D2B48C',
  'gris': '#808080',
  'anthracite': '#383838',
  'camel': '#C19A6B',
  'olive': '#6B7B3D',
  'marine': '#2C3E50',
  'prune': '#5B2C4F',
  'vert forêt': '#2D5A3D',
  'ivoire': '#FFFFF0',
  'bleu ciel': '#87CEEB',
  'gris perle': '#C0C0C0',
  'écru': '#F5F5DC',
  'gris clair': '#D3D3D3',
  'bleu toile': '#4A6FA5',
  'rouge toile': '#C44536',
  'sur mesure': '#D4C5B2',
  'indigo': '#3F51B5',
  'terracotta': '#C67B5C',
  'crème': '#F5F0E8',
  'bleu poudré': '#B0C4DE',
  'gris chiné': '#A9A9A9',
  'bordeaux': '#722F37',
  'par défaut': '#1A1A1A'
};

const getHexForColor = (name) => colorMap[name.toLowerCase()] || '#8A8A8A';

function mapShopifyProduct(node) {
  // Handle price
  const price = node.priceRange?.minVariantPrice?.amount
    ? parseInt(node.priceRange.minVariantPrice.amount, 10)
    : 0;

  // Handle images
  const images = node.images?.edges?.map(edge => edge.node.url) || [];

  // Default colors/sizes if missing
  const colors = [{ name: 'Unique', hex: '#1A1A1A' }];
  let sizes = ['Unique'];

  // Try to extract colors and sizes from Shopify options if they exist
  if (node.options && node.options.length > 0) {
    const colorOption = node.options.find(o => o.name.toLowerCase() === 'couleur' || o.name.toLowerCase() === 'coloris');
    if (colorOption && colorOption.values.length > 0 && colorOption.values[0] !== 'Default Title') {
      colors.length = 0;
      colorOption.values.forEach(v => colors.push({ name: v, hex: getHexForColor(v) }));
    }

    const sizeOption = node.options.find(o => o.name.toLowerCase() === 'taille' || o.name.toLowerCase() === 'size');
    if (sizeOption && sizeOption.values.length > 0 && sizeOption.values[0] !== 'Default Title') {
      sizes = sizeOption.values;
    }
  }

  // Determine category from tags
  let category = 'unisexe'; // Default
  const rawTags = node.tags || [];
  const tagsLower = rawTags.map(t => t.toLowerCase());

  if (tagsLower.includes('femme')) category = 'femme';
  else if (tagsLower.includes('homme')) category = 'homme';
  else if (tagsLower.includes('unisexe')) category = 'unisexe';

  // Determine subcategory from productType
  let subcategory = 'Autre';
  if (node.productType && node.productType.trim() !== '') {
    subcategory = node.productType;
  }

  // Determine availability
  const availability = node.availableForSale ? 'available' : 'unavailable';

  // Parse variants to send to frontend for checking availability of size/color combos
  const variants = node.variants?.edges?.map(edge => ({
    id: edge.node.id,
    title: edge.node.title,
    availableForSale: edge.node.availableForSale,
    selectedOptions: edge.node.selectedOptions,
  })) || [];

  return {
    id: node.id,
    name: node.title,
    slug: node.handle,
    category,
    subcategory,
    price,
    colors,
    sizes,
    variants,
    images,
    tags: rawTags,
    madeInFrance: tagsLower.includes('made-in-france') || tagsLower.includes('made in france'),
    description: node.description || 'Description à venir.',
    details: node.metafield?.value || 'Ajoutez le champ méta personnalisé `custom.details` sur Shopify pour afficher la composition ici.',
    availability,
    featured: true,
    isShopify: true
  };
}

export async function getAllProducts(language = 'fr') {
  try {
    const shopifyNodes = await fetchShopifyProducts(50, language);
    const shopifyProducts = shopifyNodes.map(mapShopifyProduct);
    return shopifyProducts;
  } catch (error) {
    console.error('[getAllProducts] ERROR fetching Shopify products:', error.message);
    return [];
  }
}

/**
 * Helper privé : un produit est-il un accessoire ?
 * Source de vérité partagée entre les filtres genre (qui DOIVENT exclure
 * les accessoires) et la page /accessoires (qui les regroupe).
 *
 * Convention Shopify :
 *  - product type === "Accessoires" (mappé sur subcategory), OU
 *  - tag `accessoires` (fallback si le client préfère taguer)
 *
 * Pourquoi exclure des pages /femme, /homme, /unisexe : un produit accessoire
 * a généralement aussi un tag genre (ex. trousse `Femme + accessoires`) pour
 * pouvoir être filtré dans le sélecteur de la page /accessoires. Sans cette
 * exclusion, il remonterait dans la grille vêtements de la catégorie genre.
 */
function isAccessory(p) {
  const sub = (p.subcategory || '').toLowerCase();
  const tags = (p.tags || []).map(t => t.toLowerCase());
  return (
    sub === 'accessoires' ||
    sub === 'accessories' ||
    tags.includes('accessoires') ||
    tags.includes('accessories')
  );
}

export async function getProductsByCategory(category, language = 'fr') {
  const all = await getAllProducts(language);
  return all.filter(p => p.category === category && !isAccessory(p));
}

export async function getProductBySlug(slug, language = 'fr') {
  const all = await getAllProducts(language);
  return all.find(p => p.slug === slug);
}

export async function getFeaturedProducts(language = 'fr') {
  const all = await getAllProducts(language);
  return all.filter(p => p.featured);
}

export async function getProductsBySubcategory(category, subcategory, language = 'fr') {
  const all = await getAllProducts(language);
  // Exclut les accessoires : ils ont leur propre page /accessoires avec
  // sous-filtres dédiés (Sacs, Trousses, Lunettes…).
  return all.filter(p => p.category === category && p.subcategory === subcategory && !isAccessory(p));
}

export async function getAvailableSubcategories(category, language = 'fr') {
  const categoryProducts = await getProductsByCategory(category, language);
  return [...new Set(categoryProducts.map(p => p.subcategory))];
}

/**
 * Récupère tous les produits considérés comme "Accessoires".
 * Utilise le helper privé `isAccessory` (cf. plus haut) pour garantir la
 * symétrie : un produit est dans /accessoires si et seulement s'il est
 * exclu des pages /femme, /homme, /unisexe.
 *
 * Les produits restent classés par genre (femme/homme/unisexe) via leurs
 * tags : c'est ce qui permet le sélecteur Femme/Homme/Unisexe sur la page
 * /accessoires sans qu'ils remontent dans les pages vêtements.
 */
export async function getAccessories(language = 'fr') {
  const all = await getAllProducts(language);
  return all.filter(isAccessory);
}
