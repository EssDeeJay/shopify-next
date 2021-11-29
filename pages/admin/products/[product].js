import { getProductSlugs, getProduct, getAllProducts } from "../../../lib/adminShopify";
import EditProductForm from "../../../components/admin/EditProductForm";

export default function EditProductPage({ product }) {
  return (
    <div className="min-h-screen">
      <EditProductForm product={product} />
    </div>
  );
}

export async function getStaticPaths() {
  // const products = await getProductSlugs();
  const products = await getAllProducts();

  const paths = products.map((item) => {
    // const product = String(item.handle);
    const product = String(item.id);

    return {
      params: {
        product,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = await getProduct({id: params.product});

  return {
    props: {
      product,
    },
  };
}
