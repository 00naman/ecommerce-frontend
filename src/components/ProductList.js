import React, { useEffect, useState } from 'react';
import apiClient from '../api/ApiClient';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get('/get-product');
        setProducts(response.data.products);
      } catch (err) {
        setError('Failed to load products');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {error ? (
        <p>{error}</p>
      ) : (
        products.map((product) => <ProductCard key={product._id} product={product} />)
      )}
    </div>
  );
};

export default ProductList;
