import ProductList from "../../../components/admin/ProductList";
import {
  getCollectionSlugs,
  getProductsInCollection,
  getCollectionsList
} from "../../../lib/adminShopify";

export default function Collection({ products, collectionName }) {
  return (
    <div>
      <ProductList products={products} collectionName={collectionName} />
    </div>
  );
}

export async function getStaticPaths() {
  // const collections = await getCollectionSlugs();
  const collections = await getCollectionsList();

  const paths = collections.map((item) => {
    // const collection = String(item.node.handle);
    const collection = String(item.collection_id);

    return {
      params: { collection },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const handle = await params.collection;
  const { products, collectionName } = await getProductsInCollection({collectionId: params.collection});

  return {
    props: {
      products,
      collectionName,
    },
  };
}
