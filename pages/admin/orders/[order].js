import { getAllOrders, getOrder } from "../../../lib/adminShopify";

export default function Order({ order }) {
  return (
    <div className="bg-white max-w-2xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="h-64 grid grid-flow-col gap-4">
        <div className="grid-cols-6">
          <h1 className="text-lg font-bold">Customer</h1><br />
          <p><b>Full name:</b> {order.customer.first_name} {order.customer.last_name}</p>
          <p><b>Phone:</b> {order.phone}</p>
          <p><b>Address:</b> {order.billing_address.address1} - {order.billing_address.city} - {order.billing_address.country}</p>
        </div>
        <div className="grid-cols-6">
          <h1 className="text-lg font-bold">Bill</h1><br />
          <p className="mb-2 font-bold">Products:</p>
          <p className="mb-2">
            <ul>
              {order.line_items.map((item, index) => (
                <li>
                  {index+1}. {item.name} ({item.price} {order.currency}) x{item.quantity}
                </li>
              ))}
            </ul>
          </p>
          <p className="font-bold">Shipping:</p>
          <p className="mb-2">
            <ul>
              {order.shipping_lines.map((item, index) => (
                <>
                  <li>Method: {item.code}</li>
                  <li>Price: {item.price} {order.currency}</li>
                </>
              ))}
            </ul>
          </p>
          <p className="mb-2"><span className="font-bold">VAT:</span> 10% ({order.total_tax} {order.currency})</p>
          <p className="mb-2"><span className="font-bold">Total price:</span> {order.total_price} {order.currency}</p>
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const orders = await getAllOrders();

  const paths = orders.map((item) => {
    const order = String(item.id);

    return {
      params: { order },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const id = await params.order;
  const order = await getOrder(id);

  return {
    props: {
      order,
    },
  };
}
