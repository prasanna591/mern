import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/product";

const HomePage = () => {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center h-screen overflow-auto bg-gray-200 dark:bg-slate-600">
      <div className="text-center w-full px-4">
        {/* Grid for Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {products.length === 0 && (
          <div className="col-span-full text-center">
            <p className="text-gray-600">No products found!</p>
            <Link
              to="/create"
              className="font-semibold text-blue-600 hover:underline mt-4 block"
            >
              Create Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
