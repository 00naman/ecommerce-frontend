import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/ApiClient";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [books, setBooks] = useState([]);
  const [stationery, setStationery] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get("/get-product"); // Fetch all products
        const productData = response.data.products;

        setProducts(productData.slice(0, 10)); // Limit to 10 products for the featured section

        // Filter products by category
        setBooks(productData.filter((product) => product.category === "Books"));
        setStationery(
          productData.filter((product) => product.category === "Kids' Wear")
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Reusable category section renderer
  const renderCategorySection = (title, categoryProducts) => (
    <div className="container mx-auto py-12 pl-5 pr-5">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        {title}
      </h2>
      {categoryProducts.length > 0 ? (
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {categoryProducts.map((product) => (
            <div
              key={product._id}
              className="min-w-[300px] bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition group"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-700">
                  {product.name}
                </h3>
                <p className="text-gray-500">₹{product.price}</p>
                <p className="text-gray-500 pb-5">{`⭐ ${product.rating} / 5`}</p>

                <Link
                  to={`/product/${product._id}`}
                  className="inline-block bg-beige-100 font-bold text-black px-4 py-2 rounded-2xl hover:text-brownie-100 hover:scale-105 duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available.</p>
      )}
    </div>
  );

  return (
    <div className="bg-beige-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-brownie-100 text-black py-12">
    <div className="container mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4 pt-20">
        Welcome to Mytalorzone By Sahiba
      </h1>
      <p className="text-lg">
        Discover the best products at unbeatable prices!
      </p>
      <button
        onClick={() => window.scrollBy({ top: 350, behavior: "smooth" })}
        className="mt-6 inline-block bg-beige-100 text-black font-bold py-2 px-6 rounded-2xl hover:text-brownie-100 hover:scale-105 duration-400"
      >
        Shop Now
      </button>
    </div>
  </div>

      {/* Featured Products Section */}
      <div className="container mx-auto py-12 pl-5 pr-5">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Featured Products
        </h2>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {products.map((product) => (
            <div
              key={product._id}
              className="min-w-[300px] sm:min-w-[900px] bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition group"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-700">
                  {product.name}
                </h3>
                <p className="text-gray-500 ">₹{product.price}</p>
                <p className="text-gray-500 pb-5">{`⭐ ${product.rating} / 5`}</p>

                <Link
                  to={`/product/${product._id}`}
                  className="inline-block bg-beige-100 font-bold text-black px-4 py-2 rounded-2xl hover:text-brownie-100 hover:scale-105 duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Sections */}
      {renderCategorySection("Books", books)}
      {renderCategorySection("Kid's Wear", stationery)}
    </div>
  );
};

export default Home;
