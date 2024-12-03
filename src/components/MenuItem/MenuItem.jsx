// src/components/MenuItem.jsx

import React from "react";
import { Card, Row, Col } from "antd";
import PropTypes from "prop-types";
import ProductItem from "./ProductItem.jsx";
import "./MenuItem.css";

const MenuItem = ({ category, products, onAddToCart, onFavorite }) => {
  return (
    <Card className="menu-item-card" title={category.name}>
      <Row gutter={[16, 16]}>
        {products.map((product) =>
          product.variants.map((variant) => (
            <Col key={variant._id} xs={24} sm={12} md={8} lg={6}>
              <ProductItem
                product={product}
                variant={variant}
                onAddToCart={onAddToCart}
                onFavorite={onFavorite}
              />
            </Col>
          ))
        )}
      </Row>
    </Card>
  );
};

MenuItem.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      variants: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          percentDiscount: PropTypes.number,
          images: PropTypes.arrayOf(
            PropTypes.shape({
              url: PropTypes.string.isRequired,
            })
          ),
        })
      ).isRequired,
    })
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
};

export default MenuItem;