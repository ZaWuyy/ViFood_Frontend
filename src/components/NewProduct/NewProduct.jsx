// src/pages/NewProduct.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spin, Empty } from "antd";
import ProductItem from "../components/ProductItem.jsx";
import { fetchProducts } from "../redux/product/product.actions.js";
import "./NewProduct.css";

const NewProduct = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const filterRecentProducts = () => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return products.filter(
      (product) => new Date(product.createdAt) >= threeDaysAgo
    );
  };

  const recentProducts = filterRecentProducts();

  if (loading) {
    return <Spin className="spinner-container" />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (recentProducts.length === 0) {
    return <Empty description="No New Products Available" />;
  }

  return (
    <div className="new-product">
      <h2>New Products</h2>
      <Row gutter={[16, 16]}>
        {recentProducts.map((product) =>
          product.variants.map((variant) => (
            <Col key={variant._id} xs={24} sm={12} md={8} lg={6}>
              <ProductItem
                product={product}
                variant={variant}
                onAddToCart={(prod, varnt) => {
                  // Handle add to cart
                }}
                onFavorite={(prod) => {
                  // Handle add to favorites
                }}
              />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default NewProduct;