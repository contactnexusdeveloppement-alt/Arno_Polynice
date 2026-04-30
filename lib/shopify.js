/**
 * Shopify Storefront API Implementation
 */

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function shopifyFetch({ query, variables, revalidate }) {
  const endpoint = `https://${domain}/api/2025-01/graphql.json`;

  // Default: no-store (live data for product/cart queries).
  // For static-ish content (metaobjects), pass revalidate: <seconds> to enable ISR.
  const cacheConfig = typeof revalidate === 'number'
    ? { next: { revalidate } }
    : { cache: 'no-store' };

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      ...cacheConfig,
    });

    const body = await result.json();

    if (body.errors) {
      console.error('Shopify API errors:', body.errors);
      throw new Error('Erreur lors de la requête Shopify');
    }

    return {
      status: result.status,
      body,
    };
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    throw error;
  }
}

// ==========================================
// QUERIES
// ==========================================

// Language code mapping for Shopify Storefront API
const SHOPIFY_LANG_MAP = { fr: 'FR', en: 'EN', es: 'ES' };

export async function getProducts(limit = 25, language = 'fr') {
  const lang = SHOPIFY_LANG_MAP[language] || 'FR';
  const query = `
    query getProducts($first: Int!) @inContext(language: ${lang}) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            metafield(namespace: "custom", key: "details") {
              value
            }
            productType
            tags
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            collections(first: 5) {
              edges {
                node {
                  title
                  handle
                }
              }
            }
            options {
              name
              values
            }
            variants(first: 25) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: { first: limit },
  });

  return response.body.data.products.edges.map(edge => edge.node);
}

export async function getProduct(handle, language = 'fr') {
  const lang = SHOPIFY_LANG_MAP[language] || 'FR';
  const query = `
    query getProduct($handle: String!) @inContext(language: ${lang}) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        metafield(namespace: "custom", key: "details") {
          value
        }
        productType
        tags
        availableForSale
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        options {
          name
          values
        }
        variants(first: 50) {
          edges {
            node {
              id
              title
              availableForSale
              selectedOptions {
                name
                value
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: { handle },
  });

  return response.body.data.product;
}

// ==========================================
// MUTATIONS (CART)
// ==========================================

export async function createCart() {
  const query = `
    mutation createCart {
      cartCreate {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `;

  const response = await shopifyFetch({ query });
  return response.body.data.cartCreate.cart;
}

export async function addToCart(cartId, lines) {
  const query = `
    mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                    }
                    product {
                      title
                      handle
                      images(first: 1) {
                        edges {
                          node {
                            url
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: { cartId, lines },
  });

  return response.body.data.cartLinesAdd.cart;
}

// ==========================================
// HOMEPAGE DYNAMIC CONTENT
// ==========================================

/**
 * Fetches a collection by handle, including its image
 * Used for category cards (Femme, Homme, Unisexe)
 */
export async function getCollectionByHandle(handle) {
  const query = `
    query getCollectionByHandle($handle: String!) {
      collection(handle: $handle) {
        id
        title
        handle
        image {
          url
          altText
          width
          height
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch({
      query,
      variables: { handle },
    });
    return response.body.data.collection;
  } catch (error) {
    console.error(`Error fetching collection "${handle}":`, error);
    return null;
  }
}

/**
 * Fetches hero slide images from Shopify metaobjects
 * The client manages these from Content → Hero Slides in Shopify Admin
 * Metaobject type: "hero_slide" with fields: image (file), link (url), position (integer)
 */
export async function getHeroSlides(count = 3) {
  const query = `
    query getHeroSlides($type: String!, $first: Int!) {
      metaobjects(type: $type, first: $first) {
        edges {
          node {
            fields {
              key
              value
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch({
      query,
      variables: { type: 'hero_slide', first: count },
    });

    const metaobjects = response.body.data.metaobjects?.edges || [];

    return metaobjects.map(({ node }) => {
      const fields = {};
      node.fields.forEach(f => {
        if (f.reference?.image) {
          fields[f.key] = f.reference.image;
        } else {
          fields[f.key] = f.value;
        }
      });

      return {
        imageUrl: fields.image?.url || null,
        altText: fields.image?.altText || 'Hero image',
        link: fields.link || null,
      };
    });
  } catch (error) {
    console.error('[getHeroSlides] Error:', error.message);
    return [];
  }
}

/**
 * Fetches the vision section image from Shopify metaobjects
 * The client manages this from Content → Vision Image in Shopify Admin
 * Metaobject type: "vision_image" with field: image (file)
 */
export async function getVisionImage() {
  const query = `
    query getVisionImage($type: String!) {
      metaobjects(type: $type, first: 1) {
        edges {
          node {
            fields {
              key
              value
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch({
      query,
      variables: { type: 'vision_image' },
    });

    const entry = response.body.data.metaobjects?.edges?.[0]?.node;
    if (!entry) return null;

    const imageField = entry.fields.find(f => f.key === 'image');
    if (!imageField?.reference?.image?.url) return null;

    return {
      url: imageField.reference.image.url,
      altText: imageField.reference.image.altText || 'Notre vision',
    };
  } catch (error) {
    console.error('[getVisionImage] Error:', error.message);
    return null;
  }
}

/**
 * Fetches Notre Histoire page images from Shopify metaobjects
 * The client manages these from Content → Histoire Image in Shopify Admin
 * Metaobject type: "histoire_image" with fields: image (file), position (integer)
 */
export async function getHistoireImages() {
  const query = `
    query getHistoireImages($type: String!) {
      metaobjects(type: $type, first: 5) {
        edges {
          node {
            fields {
              key
              value
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch({
      query,
      variables: { type: 'histoire_image' },
    });

    const entries = response.body.data.metaobjects?.edges || [];

    return entries.map(({ node }) => {
      const fields = {};
      node.fields.forEach(f => {
        if (f.reference?.image) {
          fields[f.key] = f.reference.image;
        } else {
          fields[f.key] = f.value;
        }
      });

      return {
        url: fields.image?.url || null,
        altText: fields.image?.altText || 'Notre histoire',
        position: parseInt(fields.position || '0', 10),
      };
    }).sort((a, b) => a.position - b.position);
  } catch (error) {
    console.error('[getHistoireImages] Error:', error.message);
    return [];
  }
}

/**
 * Fetches the Notre Éthique page content (header + quote) from Shopify metaobjects
 * The client manages this from Content → Metaobjects → Ethics Page in Shopify Admin
 * Metaobject type: "ethics_page" with fields: label, title, intro, quote_text, quote_author
 * Returns null if not found (page falls back to static defaults).
 */
export async function getEthicsPage(language = 'fr') {
  const lang = SHOPIFY_LANG_MAP[language] || 'FR';
  const query = `
    query getEthicsPage($type: String!) @inContext(language: ${lang}) {
      metaobjects(type: $type, first: 1) {
        edges {
          node {
            fields { key value }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch({
      query,
      variables: { type: 'ethics_page' },
      // cache: 'no-store' (default) — chaque requête tape Shopify live pour
      // que les traductions Translate & Adapt apparaissent immédiatement.
      // Trafic faible sur cette page → impact perf négligeable (~200ms/req).
    });

    const entry = response.body.data.metaobjects?.edges?.[0]?.node;
    if (!entry) return null;

    const fields = {};
    entry.fields.forEach(f => { fields[f.key] = f.value; });

    return {
      label: fields.label || null,
      title: fields.title || null,
      intro: fields.intro || null,
      quoteText: fields.quote_text || null,
      quoteAuthor: fields.quote_author || null,
    };
  } catch (error) {
    console.error('[getEthicsPage] Error:', error.message);
    return null;
  }
}

/**
 * Fetches the Notre Éthique values (4 entries) from Shopify metaobjects, ordered by position.
 * The client manages these from Content → Metaobjects → Ethics Value in Shopify Admin
 * Metaobject type: "ethics_value" with fields: position, number, title, text
 * Returns [] if none found (page falls back to static defaults).
 */
export async function getEthicsValues(language = 'fr') {
  const lang = SHOPIFY_LANG_MAP[language] || 'FR';
  const query = `
    query getEthicsValues($type: String!) @inContext(language: ${lang}) {
      metaobjects(type: $type, first: 10) {
        edges {
          node {
            fields { key value }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch({
      query,
      variables: { type: 'ethics_value' },
      // cache: 'no-store' (default) — fraîcheur immédiate des traductions.
    });

    const entries = response.body.data.metaobjects?.edges || [];
    if (entries.length === 0) return [];

    return entries
      .map(({ node }) => {
        const fields = {};
        node.fields.forEach(f => { fields[f.key] = f.value; });
        return {
          position: parseInt(fields.position || '0', 10),
          number: fields.number || '',
          title: fields.title || '',
          text: fields.text || '',
        };
      })
      .sort((a, b) => a.position - b.position);
  } catch (error) {
    console.error('[getEthicsValues] Error:', error.message);
    return [];
  }
}

/**
 * Fetches the Presse page header (label + titre + intro) from Shopify metaobjects.
 * Le client gère ce contenu depuis Content → Metaobjects → Press Page.
 * Type metaobject : "press_page" avec champs : label, title, intro.
 * Retourne null si non trouvé (la page utilise alors un fallback statique).
 */
export async function getPressPage(language = 'fr') {
  const lang = SHOPIFY_LANG_MAP[language] || 'FR';
  const query = `
    query getPressPage($type: String!) @inContext(language: ${lang}) {
      metaobjects(type: $type, first: 1) {
        edges {
          node {
            fields { key value }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch({
      query,
      variables: { type: 'press_page' },
      // cache: 'no-store' (default) — fraîcheur immédiate des traductions.
    });

    const entry = response.body.data.metaobjects?.edges?.[0]?.node;
    if (!entry) return null;

    const fields = {};
    entry.fields.forEach(f => { fields[f.key] = f.value; });

    return {
      label: fields.label || null,
      title: fields.title || null,
      intro: fields.intro || null,
    };
  } catch (error) {
    console.error('[getPressPage] Error:', error.message);
    return null;
  }
}

/**
 * Fetches the press_item entries (articles + vidéos) depuis Shopify metaobjects.
 * Type metaobject : "press_item" avec champs :
 *   position, type (article|video), media_name, title, excerpt,
 *   publish_date, url, main_image (file)
 *
 * L'image principale est résolue en URL via la query reference.
 * Retourne [] si aucune entrée (la page affiche alors un message d'invitation).
 */
export async function getPressItems(language = 'fr') {
  const lang = SHOPIFY_LANG_MAP[language] || 'FR';
  const query = `
    query getPressItems($type: String!) @inContext(language: ${lang}) {
      metaobjects(type: $type, first: 50) {
        edges {
          node {
            id
            fields {
              key
              value
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch({
      query,
      variables: { type: 'press_item' },
      // cache: 'no-store' (default) — Adelson voit ses nouvelles parutions immédiatement.
    });

    const entries = response.body.data.metaobjects?.edges || [];
    if (entries.length === 0) return [];

    return entries
      .map(({ node }) => {
        const fields = {};
        const refs = {};
        node.fields.forEach(f => {
          fields[f.key] = f.value;
          if (f.reference?.image?.url) {
            refs[f.key] = {
              url: f.reference.image.url,
              alt: f.reference.image.altText || '',
              width: f.reference.image.width || null,
              height: f.reference.image.height || null,
            };
          }
        });
        return {
          id: node.id,
          position: parseInt(fields.position || '0', 10),
          type: (fields.type || 'article').toLowerCase(),
          mediaName: fields.media_name || '',
          title: fields.title || '',
          excerpt: fields.excerpt || '',
          publishDate: fields.publish_date || null,
          url: fields.url || null,
          mainImage: refs.main_image || null,
        };
      })
      .sort((a, b) => a.position - b.position);
  } catch (error) {
    console.error('[getPressItems] Error:', error.message);
    return [];
  }
}

/**
 * Fetches the first N products from a collection for the Hero section (legacy fallback)
 */
export async function getHomepageHeroImages(collectionHandle = 'en-vedette', count = 3) {
  const query = `
    query getHeroImages($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        products(first: $first) {
          edges {
            node {
              title
              handle
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch({
      query,
      variables: { handle: collectionHandle, first: count },
    });

    const collection = response.body.data.collection;
    if (!collection) return [];

    return collection.products.edges.map(({ node }) => ({
      title: node.title,
      handle: node.handle,
      imageUrl: node.images?.edges?.[0]?.node?.url || null,
      altText: node.images?.edges?.[0]?.node?.altText || node.title,
    }));
  } catch (error) {
    console.error('Error fetching hero images:', error);
    return [];
  }
}

/**
 * Fetches all category collection images for the homepage
 */
export async function getCategoryImages() {
  const handles = ['femme', 'homme', 'unisexe'];
  const results = {};

  for (const handle of handles) {
    const collection = await getCollectionByHandle(handle);
    results[handle] = collection?.image?.url || null;
  }

  return results;
}
