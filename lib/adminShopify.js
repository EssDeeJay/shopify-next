const API_KEY = process.env.API_KEY;
const API_PASSWORD = process.env.API_PASSWORD;
const STORE_NAME = process.env.STORE_NAME;
const API_VERSION = process.env.API_VERSION;

async function ShopifyDataRest({ resource, dataUpload }) {
  const URL = `https://${API_KEY}:${API_PASSWORD}@${STORE_NAME}.myshopify.com/admin/api/${API_VERSION}/${resource}.json`;
  // const URL = `https://c51fd26d5d4fb3d067d53a5e1ee1f2bb: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@chaudev.myshopify.com/admin/api/2021-10/${resource}.json`;

  if (dataUpload !== undefined) {
    console.log(dataUpload)

    // const CustomURL = `https://chaudev.myshopify.com/admin/api/2021-10/${resource}.json`
    const CustomURL = `https://c51fd26d5d4fb3d067d53a5e1ee1f2bb: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@chaudev.myshopify.com/admin/api/2021-10/${resource}.json`;

    const options = {
      method: "POST",
      // mode: 'no-cors',
      headers: {
        "X-Shopify-Access-Token": "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", //{access_token} API_PASSWORD
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(dataUpload),
    };
  
    const data = await fetch(CustomURL, options).then((response) => {
      return response.json();
    });
  
    console.log({data})

    return data;
  }

  try {
    const data = await fetch(URL).then((response) => {
      return response.json();
    });

    return data;
  } catch (error) {
    throw new Error("Fetch failed");
  }
}

async function ShopifyData({ query }) {
  // GraphQL
  const URL = `https://chaudev.myshopify.com/admin/api/2021-10/graphql.json`;

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": API_PASSWORD, //{access_token}
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
    throw new Error("Fetch failed");
  }
}

export async function getAllProducts() {
  // const query = `{
  //   products(first: 25) {
  //     edges {
  //       node {
  //         id
  //         title
  //         status
  //         handle
  //         images(first: 5) {
  //           edges {
  //             node {
  //               src
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }`;

  // const response = await ShopifyData({ query });
  // const products = response.data.products.edges
  //   ? response.data.products.edges
  //   : [];

  const response = await ShopifyDataRest({ resource: "products" });
  const products = response.products
    ? response.products
    : [];

  return products;
}

export async function getProductSlugs() {
  const query = `{
    products(first: 25) {
      edges {
        node {
          id
          handle
        }
      }
    }
  }`;

  const response = await ShopifyData({ query });
  const products = response.data.products.edges
    ? response.data.products.edges
    : [];

  return products;
}

export async function getProduct({handle, id}) {
  // const query = `{
  //   productByHandle(handle: "${handle}") {
  //     id
  //     title
  //     handle
  //     description
  //     status
  //     images(first: 5) {
  //       edges {
  //         node {
  //           src
  //         }
  //       }
  //     }
  //     options {
  //       name
  //       values
  //       id
  //     }
  //   }
  // }`;

  // const response = await ShopifyData({ query });
  // const product = response.data.productByHandle
  //   ? response.data.productByHandle
  //   : [];

  const response = await ShopifyDataRest({ resource: `products/${id}` });
  const product = response.product
    ? response.product
    : [];

  return product;
}

export async function updateProduct(dataUpdate) {
  // const query = `{
  //   mutation {
  //     productUpdate(input: {
  //       id: "${dataUpdate.id}",
  //       title: "${dataUpdate.title}",
  //       description: "${dataUpdate.description}",
  //       images: "${dataUpdate.images}",
  //     }) {
  //       product {
  //         id
  //         title
  //         handle
  //         description
  //         status
  //         images(first: 5) {
  //           edges {
  //             node {
  //               src
  //             }
  //           }
  //         }
  //         options {
  //           name
  //           values
  //           id
  //         }
  //       }
  //     }
  //   }
  // }`;

  // const response = await ShopifyData({ query });
  // const product = response.data.productUpdate
  //   ? response.data.productUpdate
  //   : [];

  const response = await ShopifyDataRest({ resource: `products`, dataUpload: dataUpdate });
  const product = response.product
    ? response.product
    : [];

  return product;
}

export async function getCollectionsList() {
  // const query = `{
  //   collections(first: 25) {
  //     edges {
  //       node {
  //         id
  //         title
  //         description
  //         handle
  //         image {
  //           src
  //         }
  //         products(first: 25) {
  //           edges {
  //             node {
  //               id
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }`;

  // const response = await ShopifyData({ query });
  // const collections = response.data.collections.edges
  //   ? response.data.collections.edges
  //   : [];

  const response = await ShopifyDataRest({ resource: `collection_listings` });
  const collections = response.collection_listings
    ? response.collection_listings
    : [];

  return collections;
}

export async function getCollectionSlugs() {
  const query = `{
    collections(first: 25) {
      edges {
        node {
          handle
        }
      }
    }
  }`;

  const response = await ShopifyData({ query });
  const collections = response.data.collections.edges
    ? response.data.collections.edges
    : [];

  return collections;
}

export async function getProductsInCollection({handle, collectionId}) {
  // const query = `{
  //   collectionByHandle(handle: "${handle}") {
  //     id
  //     title
  //     products(first: 25) {
  //       edges {
  //         node {
  //           id
  //           title
  //           status
  //           handle
  //           images(first: 5) {
  //             edges {
  //               node {
  //                 src
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }`;

  // const response = await ShopifyData({ query });
  // const products = response.data.collectionByHandle.products.edges
  //   ? response.data.collectionByHandle.products.edges
  //   : [];
  // const collectionName = response.data.collectionByHandle.title;

  const response = await ShopifyDataRest({ resource: `collections/${collectionId}/products` });
  const products = response.products
    ? response.products
    : [];

  const collectionInfo = await ShopifyDataRest({ resource: `collections/${collectionId}` });
  const collectionName = collectionInfo.collection.title;

  return { products, collectionName };
}

export async function getAllOrders() {
  // const query = `{
  //   orders(first: 25) {
  //     edges {
  //       node {
  //         id
  //         name
  //         displayFinancialStatus
  //         email
  //       }
  //     }
  //   }
  // }`;

  const response = await ShopifyDataRest({ resource: `orders` });
  const orders = response.orders ? response.orders : [];

  // const response = await ShopifyData({ query });
  // const orders = response.data.orders.edges
  //   ? response.data.orders.edges
  //   : [];

  return orders;
}

export async function getOrder(id) {
  const response = await ShopifyDataRest({ resource: `orders/${id}` });
  const order = response.order ? response.order : [];

  return order;
}

export async function createNewProduct(productData) {
  // const response = await ShopifyDataRest({ resource: `products`, dataUpload: { product: productData } });
  // console.log({response})

  // const product = response.data.product ? response.data.product : [];

  return product;
}
