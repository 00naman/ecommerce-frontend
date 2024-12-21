import React from "react";
import { useLocation, Link } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const { filteredProducts } = location.state || { filteredProducts: [] };

  return (
    <div className="container mx-auto py-12 pt-40 pr-5 pl-5">
      <h1 className="text-3xl font-bold mb-6 text-[#7A5F4A] text-center">
        Search Results
      </h1>
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-[#F5E6DA] shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {/* Product Image */}
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />

              {/* Product Details */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-[#7A5F4A]">
                  {product.name}
                </h3>
                <p className="text-gray-700 font-semibold">₹{product.price}</p>
                <p className="text-gray-500 pb-5">{`⭐ ${product.rating} / 5`}</p>
                <Link
                  to={`/product/${product._id}`}
                  className="inline-block mt-2 text-[#7A5F4A] font-bold hover:text-[#C5AC92] hover:underline transition"
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

export default SearchResults;
