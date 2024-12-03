// src/components/ProductList/ProductList.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/productAction';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts({})); // Fetch all products on mount
  }, [dispatch]);

  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>Không có sản phẩm nào.</p>
      ) : (
        products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductList;