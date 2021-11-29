import { getAllOrders } from "../../lib/adminShopify";
import Head from "next/head";
import OrderList from "../../components/admin/OrderList";

export default function Home({ orders }) {
  return (
    <div>
      <Head>
        <title>Admin - Orders</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>

      <OrderList orders={orders} />
    </div>
  );
}

export async function getStaticProps() {
  const orders = await getAllOrders();

  return {
    props: { orders },
  };
}
