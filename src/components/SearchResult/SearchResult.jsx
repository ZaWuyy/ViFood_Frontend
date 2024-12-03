// SearchResult.jsx

import React, { useEffect } from 'react';
import { Row, Col, Spin, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { fetchProducts } from '../actions/productActions.js';
import './SearchResult.css';

const SearchResult = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  // Retrieve search term from Redux state or other state management
  // Assuming SearchBar updates the Redux store with the search term
  const searchTerm = useSelector((state) => state.products.filters.search);

  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchProducts({ search: searchTerm }));
    }
  }, [dispatch, searchTerm]);

  return (
    <div className="search-result-page">
      <SearchBar />
      <h2>Kết quả tìm kiếm: "{searchTerm}"</h2>
      {loading ? (
        <Spin size="large" />
      ) : error ? (
        <Alert message="Lỗi" description={error} type="error" showIcon />
      ) : (
        <Row gutter={[16, 16]}>
          {products.length === 0 ? (
            <Alert message="Không tìm thấy sản phẩm nào." type="info" showIcon />
          ) : (
            products.map((product) => (
              <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                <ProductCard product={product} />
              </Col>
            ))
          )}
        </Row>
      )}
    </div>
  );
};

export default SearchResult;