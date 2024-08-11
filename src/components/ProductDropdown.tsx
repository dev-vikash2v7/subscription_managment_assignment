import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const ProductDropdown = ({ onSelect }: { onSelect: (name: string) => void }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {

    axiosInstance.get('/subscriptions/products')
      .then(response => setProducts(response.data.products || []))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select a product</option>
      {products.map((product: any) => (
        <option key={product.product_name} value={product.product_name}>
          {product.product_name}
        </option>
      ))}
    </select>
  );
};

export default ProductDropdown;
