import { getProductsByKeyword } from "../lib/shopify";
import ProductList from "../components/ProductList";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home({ products }) {
  const router = useRouter();
  const keyword = router.query.keyword;

  return (
    <div className="">
      <Head>
        <title>Shopify NextJS</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>

      <ProductList products={products} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const keyword = context.query?.kw || null;
  const products = await getProductsByKeyword(keyword);

  return {
    props: {
      products,
    },
  };
}
