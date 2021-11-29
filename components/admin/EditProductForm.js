import react, { useState } from "react";
import { updateProduct } from "../../lib/adminShopify";
import axios from 'axios';

const EditProductForm = ({ product }) => {
  const [productData, setProductData] = useState(product);

  const [title, setTitle] = useState(productData.title);
  const [description, setDescription] = useState(productData.body_html);
  const [status, setStatus] = useState(productData.status); // status use productChangeStatus

  const onSaveChange = async (e) => {
    e.preventDefault();
    // console.log({ title, description, status });

    const dataUpdate = {
      id: productData.id,
      title,
      body_html: description,
      status
    };

    // const productUpdated = await updateProduct(dataUpdate);
    // setProductData(productUpdated)

    // CALL NODEJS API
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { product: dataUpdate },
    };

    const response = await axios.put(`http://localhost:3001/api/v1/products`, options);

    if (response.status === 200) {
      console.log('Update product success')
    } else {
      console.log('Error')
    }
  };

  return (
    <div className="bg-white max-w-2xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="h-64 grid grid-flow-col gap-4">
        <div className="grid-cols-4 text-center">
          <img src={productData.images[0].src} width="80%" />
        </div>
        <form className="grid-cols-8">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="title"
              >
                Title
              </label>
              <input
                className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="title"
                type="text"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Description (Body HTML)
              </label>
              <textarea
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                Status
              </label>
              <div className="relative">
                <select
                  className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {status === "active" ? (
                    <>
                      <option value="active" selected>
                        Active
                      </option>
                      <option value="draft">Draft</option>
                    </>
                  ) : (
                    <>
                      <option value="active">Active</option>
                      <option value="draft" selected>
                        Draft
                      </option>
                    </>
                  )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <br />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={(e) => onSaveChange(e)}
          >
            Save change
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
