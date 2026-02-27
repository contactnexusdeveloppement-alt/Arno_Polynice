import fs from 'fs';

const domain = "arno-polynice.myshopify.com";
const storefrontAccessToken = "9882cda9157c9645186a4ff0261e5f7d";

async function testShopify() {
    const query = `
    query {
      products(first: 5) {
        edges {
          node {
            id
            title
            handle
            description
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
                }
              }
            }
            options {
              name
              values
            }
            variants(first: 10) {
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

    try {
        const result = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
            },
            body: JSON.stringify({ query }),
        });

        const body = await result.json();
        console.log(JSON.stringify(body, null, 2));
    } catch (err) {
        console.error(err);
    }
}

testShopify();
