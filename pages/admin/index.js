import { getAllProducts, getCollectionsList } from "../../lib/adminShopify";
import Head from "next/head";
import ProductList from "../../components/admin/ProductList";
import Link from "next/link";

export default function Home({ products, collections }) {
  return (
    <div>
      <Head>
        <title>Admin</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>

      <div className="bg-white">
        <div className="max-w-2xl mx-auto px-1 mt-6 sm:px-6 lg:max-w-7xl lg:px-8">
          <Link href={`/admin/products/add-new`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add new product
            </button>
          </Link>
        </div>
      </div>

      <ProductList products={products} />
    </div>
  );
}

export async function getStaticProps() {
  const products = await getAllProducts();
  const collections = await getCollectionsList();

  return {
    props: { products, collections },
  };
}
