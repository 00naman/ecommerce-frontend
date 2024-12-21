import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../api/ApiClient";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/product/${productId}`);
        setProduct(response.data.product);
      } catch (err) {
        setError("Failed to load product details");
      }
    };

    fetchProduct();
  }, [productId]);

  // Add to Cart Handler
  const handleAddToCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const isProductInCart = cart.find((item) => item._id === product._id);

      if (!isProductInCart) {
        cart.push({ ...product, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");
      } else {
        alert("Product is already in the cart!");
      }
    } catch (err) {
      console.error("Failed to add product to cart:", err);
    }
  };

  // Buy Now Handler
  const handleBuyNow = () => {
    handleAddToCart(); // Add the product to the cart first
    navigate("/cart"); // Redirect to the cart page
  };

  return (
    <div className="container mx-auto py-12 px-6 pt-20">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : product ? (
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Image Section */}
          <div className="md:w-1/2 flex items-center justify-center bg-gray-100">
            <img
              src={product.img}
              alt={product.name}
              className="w-auto h-[600px] object-cover rounded-md"
            />
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 p-6">
            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>

            {/* Price */}
            <p className="text-2xl text-[#7A5F4A] font-semibold mb-4">
              ₹{product.price}
            </p>

            {/* Rating and Stock Info */}
            <div className="flex items-center mb-6">
              <p className="text-yellow-500 font-semibold text-lg mr-4">
                {`⭐ ${product.rating} / 5`}
              </p>
              <p className="text-sm text-gray-500">
                ({product.soldStockValue} sold)
              </p>
            </div>

            {/* Stock Availability */}
            <p
              className={`text-sm font-semibold mb-6 ${
                product.inStockValue > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.inStockValue > 0
                ? `${product.inStockValue} items in stock`
                : "Out of stock"}
            </p>

            {/* Product Category */}
            <p className="text-sm text-gray-500 mb-6">
              Category: <span className="text-gray-700">{product.category}</span>
            </p>

            {/* Product Description */}
            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="inline-block bg-[#F5E6DA] text-black font-bold px-6 py-3 rounded-2xl hover:bg-[#D2BCA5] hover:text-[#7A5F4A] hover:scale-105 duration-300"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="inline-block bg-[#F5E6DA] text-black font-bold px-6 py-3 rounded-2xl hover:bg-[#D2BCA5] hover:text-[#7A5F4A] hover:scale-105 duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetails;
