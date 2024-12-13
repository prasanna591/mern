import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  // Handle the deletion of the product
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (success) {
      console.log("Product deleted successfully");
    } else {
      console.log("Error deleting product: ", message);
    }
  };

  // Function to handle toggling the edit form visibility
  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle the save action
  const handleUpdateProduct = async (pid) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    if (success) {
      console.log("Product updated successfully");
      setIsEditing(false); // Close the edit form after successful update
    } else {
      console.log("Error updating product: ", message);
    }
  };

  // Modal for editing the product
  const renderEditProductForm = () => {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 text-black">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={updatedProduct.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={updatedProduct.price}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL:
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={updatedProduct.image}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={() => handleUpdateProduct(product._id)}
              className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="ml-2 inline-flex items-center px-4 py-2 bg-gray-500 border border-transparent rounded-md font-semibold text-white hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-lime-50 dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700 hover:shadow-lg dark:hover:shadow-gray-900 transition duration-300 hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="bg-gray-200 dark:bg-slate-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
        <h3 className="text-lg font-bold mb-2 dark:text-black">
          {product.name}
        </h3>
        <p className="text-gray-700 dark:text-green-900">${product.price}</p>
      </div>
      <div className="flex justify-around items-center mt-4">
        <button
          className="text-blue-500 hover:text-blue-700 transition duration-300"
          aria-label="Update Product"
          onClick={handleEditClick}
        >
          <FaRegEdit size={25} />
        </button>
        <button
          className="p-1 text-red-500 hover:text-red-700 transition duration-300"
          aria-label="Delete Product"
          onClick={() => handleDeleteProduct(product._id)}
        >
          <MdDelete size={25} />
        </button>
      </div>

      {isEditing && renderEditProductForm()}
    </div>
  );
};

export default ProductCard;
