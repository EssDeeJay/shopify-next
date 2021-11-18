import { getProductsInCollection, getAllProducts } from "../lib/shopify"
import ProductList from "../components/ProductList"
// import Hero from "../components/Hero"
import Head from 'next/head'


export default function Home({ products }) {

  return (
    <div>
      <Head>
        <title>Shopify NextJS</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>
      {/* <Hero /> */}
      <ProductList products={products} />
    </div>
  )
}

export async function getStaticProps() {
  // const products = await getProductsInCollection()
  const products = await getAllProducts()

  return {
    props: { products }, // will be passed to the page component as props
  }
}