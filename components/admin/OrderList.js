import Link from "next/link";

const OrderList = ({ orders }) => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Orders</h2>

        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Customer
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Order date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th> */}
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order, index) => (
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {order.customer.first_name}{" "}
                            {order.customer.last_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {order.total_price} {order.currency}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {order.created_at}
                          </div>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">Regional Paradigm Technician</div>
                            <div className="text-sm text-gray-500">Optimization</div>
                          </td> */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {order.financial_status}
                          </span>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Admin
                          </td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/admin/orders/${order.id}`}>
                            <a className="text-indigo-600 hover:text-indigo-900">
                              Detail
                            </a>
                          </Link>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a className="text-red-600 hover:text-red-900">
                            Delete
                          </a>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
