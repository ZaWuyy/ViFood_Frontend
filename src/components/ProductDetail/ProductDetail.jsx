// src/pages/ProductDetail/ProductDetail.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../redux/actions/productAction';
import { addToCart } from '../../redux/actions/cartAction';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, loading, error } = useSelector((state) => state.product);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (token) {
      dispatch(addToCart(selectedProduct._id));
    } else {
      // Redirect to sign in if not authenticated
      window.location.href = '/login';
    }
  };

  if (loading || !selectedProduct) return <p>Đang tải chi tiết sản phẩm...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={selectedProduct.image} alt={selectedProduct.name} />
      </div>
      <div className="product-detail-info">
        <h2>{selectedProduct.name}</h2>
        <p className="product-detail-price">{selectedProduct.price.toLocaleString()} VND</p>
        <p className="product-detail-description">{selectedProduct.description}</p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;