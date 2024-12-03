// src/components/FilterBar.jsx

import React, { useEffect, useState } from 'react';
import { Checkbox, Slider, Select, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productAction.js';
import { fetchCategories } from '../../redux/actions/categoryActions.js';
import './Filter.css';

const { Option } = Select;

const discountOptions = [
  { label: 'Có khuyến mãi', value: true },
  { label: 'Không khuyến mãi', value: false },
];

const FilterBar = () => {
  const dispatch = useDispatch();
  
  // Selectors for products and categories
  const { products, loading, error } = useSelector((state) => state.product);
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state) => state.category);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000000]); // Giá từ 0 đến 50,000,000 VND
  const [hasDiscount, setHasDiscount] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Fetch products whenever filters change
  useEffect(() => {
    const filters = {
      categories: selectedCategories,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      discount: hasDiscount,
    };
    dispatch(fetchProducts(filters));
  }, [dispatch, selectedCategories, priceRange, hasDiscount]);

  const onCategoryChange = (values) => {
    setSelectedCategories(values);
  };

  const onPriceChange = (values) => {
    setPriceRange(values);
  };

  const onDiscountChange = (checkedValues) => {
    if (checkedValues.length === 0) {
      setHasDiscount(null);
    } else {
      setHasDiscount(checkedValues.includes(true));
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 50000000]);
    setHasDiscount(null);
  };

  return (
    <div className="filter-container">
      <h3>Bộ lọc sản phẩm</h3>

      {/* Danh mục */}
      <div className="filter-section">
        <h4>Danh mục</h4>
        {categoriesLoading ? (
          <p>Đang tải danh mục...</p>
        ) : categoriesError ? (
          <p className="error">{categoriesError}</p>
        ) : (
          <Select
            mode="multiple"
            allowClear
            placeholder="Chọn danh mục"
            value={selectedCategories}
            onChange={onCategoryChange}
          >
            {categories.map((category) => (
              <Option key={category._id} value={category.name}>
                {category.name}
              </Option>
            ))}
          </Select>
        )}
      </div>

      {/* Khoảng giá */}
      <div className="filter-section">
        <h4>Khoảng giá (VND)</h4>
        <Slider
          range
          min={0}
          max={50000000}
          step={100000}
          value={priceRange}
          onChange={onPriceChange}
          marks={{
            0: '0',
            10000000: '10M',
            20000000: '20M',
            30000000: '30M',
            40000000: '40M',
            50000000: '50M',
          }}
        />
      </div>

      {/* Khuyến mãi */}
      <div className="filter-section">
        <h4>Khuyến mãi</h4>
        <Checkbox.Group
          options={discountOptions}
          value={hasDiscount !== null ? [hasDiscount] : []}
          onChange={onDiscountChange}
        />
      </div>

      {/* Button Xóa bộ lọc */}
      <Button type="primary" onClick={clearFilters} className="clear-filters-button">
        Xóa bộ lọc
      </Button>

      {/* Loading and Error Messages */}
      {loading && <p>Đang tải sản phẩm...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default FilterBar;