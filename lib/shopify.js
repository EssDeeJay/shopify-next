const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

async function ShopifyData(query) {
  const URL = `https://${domain}/api/2021-10/graphql.json`;

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data = await fetch(URL, options).then((response) => {
      return response.json();
    });

    return data;
  } catch (error) {
    // throw new Error("Products not fetched");
    throw new Error(error.message);
  }
}

// collectionByHandle(handle: "summer"): handle is SEO Url (ex: https://chaudev.myshopify.com/collections/summer)
export async function getProductsInCollection(handle) {
  const query = `
  {
    collectionByHandle(handle: "${handle}") {
      id
      title
      products(first: 25) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 5) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);
  // console.log({object: response.data.collectionByHandle})

  const products = response.data.collectionByHandle.products.edges
    ? response.data.collectionByHandle.products.edges
    : [];

  const collectionName = response.data.collectionByHandle.title;

  return { products, collectionName };
}

export async function getCollectionsList() {
  const query = `{
    collections(first: 250) {
      edges {
        node {
          id
          title
          description
          handle
          image {
            src
          }
          products(first: 250) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);
  const collections = response.data.collections.edges
    ? response.data.collections.edges
    : [];

  return collections;
}

export async function getCollectionSlugs() {
  const query = `{
      collections(first: 250) {
        edges {
          node {
            handle
          }
        }
      }
    }`;
  const response = await ShopifyData(query);

  const slugs = response.data.collections.edges
    ? response.data.collections.edges
    : [];

  return slugs;
}

export async function getAllProducts() {
  const query = `{
    products(first: 250) {
      edges {
        node {
            id
            title
            handle
            priceRange {
                minVariantPrice {
                    amount
                }
            }
            images(first: 5) {
                edges {
                    node {
                        originalSrc
                        altText
                    }
                }
            }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  const slugs = response.data.products.edges
    ? response.data.products.edges
    : [];

  return slugs;
}

export async function getProduct(handle) {
  const query = `
  {
    productByHandle(handle: "${handle}") {
    	collections(first: 1) {
      	edges {
          node {
            products(first: 5) {
              edges {
                node {
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                  handle
                  title
                  id
                  images(first: 5) {
                    edges {
                      node {
                        originalSrc
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
    	}
      id
      title
      handle
      description
      images(first: 5) {
        edges {
          node {
            originalSrc
            altText
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 25) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            image {
              originalSrc
              altText
            }
            title
            id
            priceV2 {
              amount
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  const product = response.data.productByHandle
    ? response.data.productByHandle
    : [];

  return product;
}

export async function getProductsByKeyword(keyword) {
  // keyword is 'title'
  const query = `
  {
    products(query:"${keyword}" first: 25) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 5) {
            edges {
              node {
                originalSrc
                altText
              }
            }
          }
          options {
            name
            values
            id
          }
          variants(first: 25) {
            edges {
              node {
                selectedOptions {
                  name
                  value
                }
                image {
                  originalSrc
                  altText
                }
                title
                id
                priceV2 {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  const product = response.data.products.edges
    ? response.data.products.edges
    : [];

  return product;
}

export async function getProductSlugs() {
  const query = `{
      products(first: 250) {
        edges {
          node {
            handle              
          }
        }
      }
    }`;
  const response = await ShopifyData(query);

  const slugs = response.data.products.edges
    ? response.data.products.edges
    : [];

  return slugs;
}

export async function createCheckout(id, quantity) {
  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [{ variantId: "${id}", quantity: ${quantity}}]
      }) {
        checkout {
          id
          webUrl
        }
      }
    }`;

  const response = await ShopifyData(query);

  const checkout = response.data.checkoutCreate.checkout
    ? response.data.checkoutCreate.checkout
    : [];

  return checkout;
}

export async function updateCheckout(id, lineItems) {
  const lineItemsObject = lineItems.map((item) => {
    return `{
      variantId: "${item.id}",
      quantity:  ${item.variantQuantity}
    }`;
  });

  const query = `
  mutation {
    checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId: "${id}") {
      checkout {
        id
        webUrl
        lineItems(first: 25) {
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  const checkout = response.data.checkoutLineItemsReplace.checkout
    ? response.data.checkoutLineItemsReplace.checkout
    : [];

  return checkout;
}

export async function recursiveCatalog(cursor = "", initialRequest = true) {
  let data;

  if (cursor !== "") {
    const query = `{
      products(after: "${cursor}", first: 250) {
        edges {
          cursor
          node {
            id
            title
            handle
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }`;

    const response = await ShopifyData(query);
    data = response.data.products.edges ? response.data.products.edges : [];

    if (response.data.products.pageInfo.hasNextPage) {
      const num = response.data.products.edges.length;
      const cursor = response.data.products.edges[num - 1].cursor;
      console.log("Cursor: ", cursor);

      return data.concat(await recursiveCatalog(cursor));
    } else {
      return data;
    }
  } else {
    const query = `{
      products(first: 250) {
        edges {
          cursor
          node {
            id
            title
            handle
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
    `;

    const response = await ShopifyData(query);
    data = response.data.products.edges ? response.data.products.edges : [];

    if (response.data.products.pageInfo.hasNextPage) {
      const num = response.data.products.edges.length;
      const cursor = response.data.products.edges[num - 1].cursor;

      return data.concat(await recursiveCatalog(cursor));
    } else {
      return data;
    }
  }
}
