import React, { useState } from "react";
import { createNewProduct } from "../../../lib/adminShopify";
import ImageUploading from "react-images-uploading";
import axios from 'axios';

const EditProductForm = () => {
  // upload image
  const [images, setImages] = useState([]);
  const maxNumber = 250;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //   const [imagesUpload, setImagesUpload] = useState([])
  const imagesUpload = [];

  const onSaveChange = async (e) => {
    e.preventDefault();

    images.map((image) => {
      // get index of 'base64,' to subString and get only base64 endCode
      const base64Index = image.data_url.indexOf("base64,");
      const attachment = image.data_url.substring(base64Index + 7);
      const filename = image.file.name;

      // setImagesUpload([...imagesUpload, {
      //     attachment,
      //     filename
      // }])

      imagesUpload.push({ attachment, filename });
    });

    const dataUpload = {
      title,
      body_html: description,
      images: imagesUpload,
    };

    // const newProduct = await createNewProduct(dataUpload);
    // console.log({ newProduct });


    // CALL NODEJS API
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { product: dataUpload },
    };

    const response = await axios.post(`http://localhost:3001/api/v1/products`, options);

    if (response.status === 200) {
      console.log('Create new Product success')
      window.location.href = 'http://localhost:3000/admin'
    } else {
      console.log('Error')
    }
  };

  return (
    <div className="bg-white max-w-2xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="h-64 grid grid-flow-col gap-4">
        <div className="grid-cols-4 text-center">
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper grid justify-items-center">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 mr-2 mt-3 mb-1 rounded"
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Upload image
                </button>

                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <div className="grid justify-items-center">
                      <img
                        src={image["data_url"]}
                        alt=""
                        width="230"
                        className="text-center"
                      />
                    </div>
                    <div className="image-item__btn-wrapper">
                      <button
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 mt-1 mb-2 mr-1 hover:border-transparent rounded"
                        onClick={() => onImageUpdate(index)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-2 mt-1 mb-2 hover:border-transparent rounded"
                        onClick={() => onImageRemove(index)}
                      >
                        Remove
                      </button>
                    </div>
                    <br />
                  </div>
                ))}

                <br />
                <button
                  className="bg-white-500 hover hover:bg-red-100 text-red-500 py-1 px-2 mr-2 mt-3 mb-3 rounded"
                  onClick={onImageRemoveAll}
                >
                  Remove all images
                </button>
              </div>
            )}
          </ImageUploading>
        </div>
        <form className="grid-cols-12">
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

          <br />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={(e) => onSaveChange(e)}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
