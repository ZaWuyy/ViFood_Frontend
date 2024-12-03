// src/components/Navbar.jsx

import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignInPage from "../../pages/Authentication/SignInPage/SignInPage";
import { logoutAction } from "../../redux/actions/authAction";
import { addToCart, removeFromCart, getCart } from "../../redux/actions/cartAction";
import { getProducts } from "../../redux/actions/productAction";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems, totalCartCount } = cart;

  const auth = useSelector((state) => state.auth);
  const { token } = auth;

  const products = useSelector((state) => state.product);
  const { searchSuggestions } = products;

  useEffect(() => {
    if (token) {
      dispatch(getCart(token));
    }
  }, [dispatch, token]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleSearchSubmit = () => {
    navigate("/");
    dispatch(getProducts(search));
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (id) => {
    navigate(`/product/${id}`);
    setShowSuggestions(false);
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/");
  };

  const handleCartClick = () => {
    if (!token) {
      navigate("/signin"); // Chuyển hướng tới trang SignIn
    } else {
      navigate("/cart");
    }
  };

  const handleSignInClick = () => {
    navigate("/login"); // Chuyển hướng tới trang SignIn
  };

  return (
    <>
      <div className="navbar-top">
        <div className="navbar-left">
          <Link to="/">
            <img src={assets.logo} alt="Logo" className="logo" />
          </Link>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={search}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
            />
            {search && showSuggestions && searchSuggestions.length > 0 && (
              <ul className="search-suggestions active">
                {searchSuggestions.map((item) => (
                  <li key={item.id} onClick={() => handleSuggestionClick(item.id)}>
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
            <img
              src={assets.search_icon}
              alt="Search"
              className="search-icon"
              onClick={handleSearchSubmit}
            />
          </div>
        </div>

        <div className="navbar-right">
          <img src={assets.phone_icon} alt="" className="nav-right-icon" />
          <div className="navbar-phone-text">
            <p>Tư vấn trực tiếp</p>
            <a href="tel:0899330803" className="phone-number">
              0899330803
            </a>
          </div>
          <div className="navbar-fav-icon">
            <img src={assets.fav_icon} alt="Favorite" />
          </div>
          <div className="navbar-cart-icon" onClick={handleCartClick}>
            <img src={assets.basket_icon} alt="Cart" />
            {totalCartCount > 0 && (
              <div className="cart-badge">{totalCartCount}</div>
            )}
          </div>
          {!token ? (
            <button onClick={handleSignInClick}>Sign in</button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="Profile" />
              <ul className="nav-profile-dropdown">
                <li>
                  <img src={assets.bag_icon} alt="Orders" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={handleLogout}>
                  <img src={assets.logout_icon} alt="Logout" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="navbar-bottom">
        <ul className="navbar-menu">
          <span className="title_">〢Danh mục sản phẩm</span>
          <p>|</p>
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Trang chủ
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </a>
          <a
            href="#app-download"
            onClick={() => setMenu("mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            Tin tức
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            Liên hệ
          </a>
        </ul>
      </div>
    </>
  );
};

export default Navbar;