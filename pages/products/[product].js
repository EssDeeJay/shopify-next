import ProductPageContent from "../../components/ProductPageContent"
import { getAllProducts, getProduct, recursiveCatalog, getProductSlugs } from "../../lib/shopify"

export default function ProductPage ({ product }) {
  return (
    <div className="min-h-screen py-12 sm:pt-20">
      <ProductPageContent product={product} />
    </div>
  )
}

export async function getStaticPaths() {
  // const products = await recursiveCatalog()
  const products = await getProductSlugs()

  const paths = products.map(item => {
    const product = String(item.node.handle)

    return {
      params: { product }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const product = await getProduct(params.product)
  const client = true

  return {
    props: {
      product,
      client
    }
  }
}