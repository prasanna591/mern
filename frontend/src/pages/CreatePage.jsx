import React, { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePages = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const { createProduct } = useProductStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const { success, message } = await createProduct(newProduct);
      if (success) {
        alert("Product created successfully!");
        setNewProduct({ name: "", price: "", image: "" });
      } else {
        alert(`Error: ${message}`);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("An unexpected error occurred.");
    }
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Create Product
          </h2>

          {/* Name Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="name"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full p-3 border rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="price"
            >
              Product Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              placeholder="Enter product price"
              className="w-full p-3 border rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image URL Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="image"
            >
              Product Image URL
            </label>
            <input
              id="image"
              name="image"
              value={newProduct.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full p-3 border rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600 transition-all duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePages;
