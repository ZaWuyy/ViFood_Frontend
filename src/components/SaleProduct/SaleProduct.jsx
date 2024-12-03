// src/components/ProductSale.jsx

import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Empty } from "antd";
import ProductItem from "./ProductItem.jsx";
import "./ProductSale.css";

const ProductSale = () => {
  const { products, loading, error } = useSelector((state) => state.product);

  // Extract variants with a discount
  const saleVariants = products.flatMap((product) =>
    product.variants
      .filter((variant) => variant.percentDiscount > 0)
      .map((variant) => ({ product, variant }))
  );

  if (loading) {
    return <div className="spinner-container">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (saleVariants.length === 0) {
    return <Empty description="No Sale Products Available" />;
  }

  return (
    <div className="product-sale">
      <h2>Sale Products</h2>
      <Row gutter={[16, 16]}>
        {saleVariants.map(({ product, variant }) => (
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
        ))}
      </Row>
    </div>
  );
};

export default ProductSale;