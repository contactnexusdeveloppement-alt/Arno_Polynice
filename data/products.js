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
    description: node.description || 'Description à venir.',
    details: node.metafield?.value || 'Ajoutez le champ méta personnalisé `custom.details` sur Shopify pour afficher la composition ici.',
    availability,
    featured: true,
    isShopify: true
  };
}

export async function getAllProducts() {
  try {
    const shopifyNodes = await fetchShopifyProducts(50);
    const shopifyProducts = shopifyNodes.map(mapShopifyProduct);
    console.log(`[getAllProducts] Got ${shopifyProducts.length} Shopify products`);
    return shopifyProducts;
  } catch (error) {
    console.error('[getAllProducts] ERROR fetching Shopify products:', error.message);
    return [];
  }
}

export async function getProductsByCategory(category) {
  const all = await getAllProducts();
  return all.filter(p => p.category === category);
}

export async function getProductBySlug(slug) {
  const all = await getAllProducts();
  return all.find(p => p.slug === slug);
}

export async function getFeaturedProducts() {
  const all = await getAllProducts();
  return all.filter(p => p.featured);
}

export async function getProductsBySubcategory(category, subcategory) {
  const all = await getAllProducts();
  return all.filter(p => p.category === category && p.subcategory === subcategory);
}

export async function getAvailableSubcategories(category) {
  const categoryProducts = await getProductsByCategory(category);
  return [...new Set(categoryProducts.map(p => p.subcategory))];
}
