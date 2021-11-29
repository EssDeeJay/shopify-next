import ProductList from "../../components/ProductList";
import { getCollectionSlugs, getProductsInCollection } from "../../lib/shopify";

export default function Collection({ products, collectionName }) {
  return (
    <div>
      <ProductList products={products} collectionName={collectionName} />
    </div>
  );
}

export async function getStaticPaths() {
  const collections = await getCollectionSlugs();

  const paths = collections.map((item) => {
    const collection = String(item.node.handle);

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
  const { products, collectionName } = await getProductsInCollection(handle);
  const client = true

  return {
    props: {
      products,
      collectionName,
      client
    },
  };
}
