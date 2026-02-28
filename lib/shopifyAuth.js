/**
 * Shopify Storefront API Authentication Implementation
 * Handles Customer Accounts (Classic: Email + Password)
 */

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function shopifyFetch({ query, variables }) {
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

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
      // Disable cache for auth requests to ensure fresh data
      cache: 'no-store'
    });

    const body = await result.json();

    if (body.errors) {
      console.error('Shopify Auth API errors:', body.errors);
      throw new Error(body.errors[0].message || 'Erreur lors de la requête Shopify Auth');
    }

    return body;
  } catch (error) {
    console.error('Error fetching from Shopify Auth:', error);
    throw error;
  }
}

// ==========================================
// MUTATIONS (AUTH)
// ==========================================

/**
 * Creates a customer account
 */
export async function customerCreate(input) {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          firstName
          lastName
          email
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: { input },
  });

  const data = response.data.customerCreate;
  if (data.customerUserErrors.length > 0) {
    throw new Error(data.customerUserErrors[0].message);
  }

  return data.customer;
}

/**
 * Logs in a customer and returns an access token
 */
export async function customerAccessTokenCreate(input) {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: { input },
  });

  const data = response.data.customerAccessTokenCreate;
  if (data.customerUserErrors.length > 0) {
    throw new Error(data.customerUserErrors[0].message);
  }

  return data.customerAccessToken;
}

/**
 * Fetches the customer data using their access token
 */
export async function getCustomer(customerAccessToken) {
  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
        phone
        orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
          edges {
            node {
              id
              orderNumber
              processedAt
              financialStatus
              fulfillmentStatus
              totalPrice {
                amount
                currencyCode
              }
              lineItems(first: 5) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      image {
                        url
                      }
                      product {
                        handle
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
    variables: { customerAccessToken },
  });

  return response.data.customer;
}

/**
 * Sends a password recovery email to the user.
 * The redirectUrl parameter must be a whitelisted domain in Shopify Admin.
 * NOTE: As of the storefront API 2024-01, the customerRecover mutation DOES NOT accept a custom redirect URL directly.
 * Shopify hardcodes the password reset email to redirect to the primary domain set in the Shopify Admin.
 * 
 * To fix the user's issue, the store owner MUST go to Shopify Admin > Settings > Domains,
 * and ensure that "arno-polynice.com" (or the Vercel domain) is set as the PRIMARY domain for the store,
 * rather than "arno-polynice.myshopify.com". 
 * 
 * If they are using classic Customer Accounts (not the new ones), the classic account 
 * password reset email template (Shopify Admin > Settings > Notifications > Customer account password reset)
 * can also be manually edited to point to a custom URL like: 
 * href="{{ shop.url }}/reinitialiser-mot-de-passe?customer_id={{ customer.id }}&token={{ customer.reset_password_token }}"
 */
export async function customerRecover(email) {
  const query = `
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: { email },
  });

  const data = response.data.customerRecover;
  if (data.customerUserErrors && data.customerUserErrors.length > 0) {
    throw new Error(data.customerUserErrors[0].message);
  }

  return true;
}
