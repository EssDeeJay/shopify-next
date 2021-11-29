import Link from "next/link";
import axios from 'axios';

const ProductList = ({ products, collectionName }) => {
  const deleteProduct = async (productId) => {
    // CALL NODEJS API
    const response = await axios.delete(`http://localhost:3001/api/v1/products/${productId}`);

    if (response.status === 200) {
      console.log('Delete product success')
      window.location.href = 'http://localhost:3000/admin'
    } else {
      console.log('Error')
    }
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Products {collectionName ? `of '${collectionName}'` : ''}</h2>

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
                        Product
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
                    {products.map((product, index) => (
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={product.images[0].src}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.title}
                              </div>
                              {/* <div className="text-sm text-gray-500">
                                  Variants: {product.variants.length}
                                </div> */}
                            </div>
                          </div>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">Regional Paradigm Technician</div>
                            <div className="text-sm text-gray-500">Optimization</div>
                          </td> */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {product.status}
                          </span>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Admin
                          </td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/admin/products/${product.id}`}>
                            <a className="text-indigo-600 hover:text-indigo-900">
                              Edit
                            </a>
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-red-600 hover:text-red-900"
                            onClick={() => deleteProduct(product.id)}
                          >
                            Delete
                          </button>
                        </td>
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

export default ProductList;
