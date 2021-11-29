import { getProductsInCollection, getAllProducts, getCollectionsList } from "../lib/shopify"
import ProductList from "../components/ProductList"
// import Hero from "../components/Hero"
import Head from 'next/head'
import CollectionList from "../components/CollectionList"


export default function Home({ products, collections }) {
  return (
    <div>
      <Head>
        <title>Shopify NextJS</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>
      {/* <Hero /> */}

      {/* Collections */}
      <CollectionList collections={collections} />

      {/* Products */}
      <ProductList products={products} />
    </div>
  )
}

export async function getStaticProps() {
  // const products = await getProductsInCollection('summer')
  const products = await getAllProducts()
  const collections = await getCollectionsList()

  // send 'client' into pageProps to show 'Nav Component'
  const client = true

  return {
    props: { products, collections, client }, // will be passed to the page component as props
  }
}