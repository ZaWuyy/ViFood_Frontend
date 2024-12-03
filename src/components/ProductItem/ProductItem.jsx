// src/components/ProductItem.jsx

import React from "react";
import { Card, Button, Tooltip, Badge } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import "./ProductItem.css";

const { Meta } = Card;

const ProductItem = ({ product, variant, onAddToCart, onFavorite }) => {
  const discountedPrice = variant.percentDiscount
    ? (variant.price * (100 - variant.percentDiscount)) / 100
    : variant.price;

  return (
    <Badge.Ribbon
      text={`${variant.percentDiscount}% OFF`}
      color="red"
      visible={variant.percentDiscount > 0}
    >
      <Card
        hoverable
        cover={
          <img
            alt={product.name}
            src={variant.images[0]?.url || "/default-image.jpg"}
            className="product-image"
          />
        }
        className="product-item-card"
      >
        <Meta title={product.name} />
        <div className="price-section">
          {variant.percentDiscount > 0 && (
            <span className="old-price">${variant.price.toFixed(2)}</span>
          )}
          <span className="new-price">${discountedPrice.toFixed(2)}</span>
        </div>
        <div className="action-buttons">
          <Tooltip title="Add to Cart">
            <Button
              type="primary"
              shape="circle"
              icon={<ShoppingCartOutlined />}
              onClick={() => onAddToCart(product, variant)}
            />
          </Tooltip>
          <Tooltip title="Add to Favorites">
            <Button
              type="default"
              shape="circle"
              icon={<HeartOutlined />}
              onClick={() => onFavorite(product)}
            />
          </Tooltip>
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  variant: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    percentDiscount: PropTypes.number,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
};

export default ProductItem;