// src/components/FoodItem/FoodItem.js
import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleClick = () => {
      navigate(`/product/${id}`); // Điều hướng đến trang chi tiết sản phẩm
  };
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '₫';
  };

  return (
    <div className='food-item'  onClick={handleClick}> 
      <div className="food-item-img-container">
        <img className="food-item-img" src={`${url}/images/${image}`} alt="" />
        {!cartItems[id] ? (
          <img className='add' onClick={(e) => { e.stopPropagation(); addToCart(id); }} src={assets.add_icon_white} alt="" />
        ) : (
          <div className='food-item-counter'>
            <img onClick={(e) => { e.stopPropagation(); removeFromCart(id); }} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={(e) => { e.stopPropagation(); addToCart(id); }} src={assets.add_icon_green} alt="" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt='' />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">{formatPrice(price)}</p>
      </div>
    </div>
  );
};

export default FoodItem;
