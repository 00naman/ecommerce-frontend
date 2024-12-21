import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../api/ApiClient";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams(); // Get the category from URL
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await apiClient.post("/product/category", { category }); // Send category to backend
        setProducts(response.data.products); // Set the fetched products
      } catch (err) {
        setError("Failed to load products for this category.");
      }
    };

    fetchCategoryProducts();
  }, [category]); // Refetch when category changes

  return (
    <div className="container mx-auto py-12 pt-40 bg-[#F5E6DA] pl-5 pr-5 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#7A5F4A] text-center">
        Products in {category}
      </h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition group"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-[#7A5F4A]">
                  {product.name}
                </h3>
                <p className="text-gray-700 ">₹{product.price}</p>
                <p className="text-gray-500 pb-10">{`⭐ ${product.rating} / 5`}</p>

                <Link
                  to={`/product/${product._id}`}
                  className="inline-block bg-[#F5E6DA] font-bold text-black px-4 py-2 rounded-2xl hover:text-[#7A5F4A] hover:scale-105 duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
