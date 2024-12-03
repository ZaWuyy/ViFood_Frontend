// src/components/MenuDisplay.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Alert } from "antd";
import MenuItem from "./MenuItem.jsx";
import { fetchCategories } from "../redux/category/categoryActions.js";
import { fetchProducts } from "../redux/product/product.actions.js";
import "./MenuDisplay.css";

const MenuDisplay = ({ onAddToCart, onFavorite }) => {
  const dispatch = useDispatch();
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector(
    (state) => state.category
  );
  const { products, loading: productsLoading, error: productsError } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  if (categoriesLoading || productsLoading) {
    return <Spin />;
  }

  if (categoriesError) {
    return <Alert message="Error" description={categoriesError} type="error" showIcon />;
  }

  if (productsError) {
    return <Alert message="Error" description={productsError} type="error" showIcon />;
  }

  return (
    <div className="menu-display">
      {categories.map((category) => {
        const categoryProducts = products.filter(
          (product) => product.category.includes(category._id)
        );

        return (
          <MenuItem
            key={category._id}
            category={category}
            products={categoryProducts}
            onAddToCart={onAddToCart}
            onFavorite={onFavorite}
          />
        );
      })}
    </div>
  );
};

export default MenuDisplay;