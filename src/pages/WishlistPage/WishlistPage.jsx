// WishlistPage.jsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, Card, Button, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { getFavoriteProducts, removeFavoriteProduct } from '../actions/userAction.js';
import './WishlistPage.css';

const { Title } = Typography;

const WishlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Truy xuất danh sách sản phẩm yêu thích và trạng thái loading từ Redux store
  const favoriteProducts = useSelector((state) => state.user.favoriteProducts);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    // Lấy danh sách sản phẩm yêu thích khi component được mount
    dispatch(getFavoriteProducts());
  }, [dispatch]);

  // Xử lý xóa sản phẩm khỏi danh sách yêu thích
  const handleRemove = (productId) => {
    dispatch(removeFavoriteProduct(productId));
    message.success('Đã xóa sản phẩm khỏi danh sách yêu thích.');
  };

  // Xử lý mua ngay sản phẩm
  const handleBuyNow = (product) => {
    // Giả sử bạn có action addToCart để thêm sản phẩm vào giỏ hàng
    dispatch(addToCart(product));
    navigate('/cart');
    message.success('Sản phẩm đã được thêm vào giỏ hàng.');
  };

  return (
    <div className="wishlist-container">
      <Title level={2}>Danh sách yêu thích</Title>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={favoriteProducts}
        loading={loading}
        renderItem={(product) => (
          <List.Item>
            <Card
              hoverable
              cover={
                <img
                  alt={product.name}
                  src={product.image}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              }
            >
              <Card.Meta
                title={<Link to={`/products/${product.id}`}>{product.name}</Link>}
                description={`Giá: ${product.price} VND`}
              />
              <div className="wishlist-actions">
                <Button type="primary" onClick={() => handleBuyNow(product)}>
                  Mua ngay
                </Button>
                <Button danger onClick={() => handleRemove(product.id)}>
                  Xóa
                </Button>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default WishlistPage;