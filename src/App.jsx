// src/App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';

import SignInPage from './pages/Authentication/SignInPage/SignInPage';
import SignUpPage from './pages/Authentication/SignUpPage/SignUpPage';
import ForgotPasswordPage from './pages/Authentication/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from './pages/Authentication/ResetPasswordPage/ResetPasswordPage';
import EmailValidationPage from './pages/Authentication/EmailValidationPage/EmailValidationPage';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <SignInPage setShowLogin={setShowLogin} /> : null}
      <div className='app'>
        
        <Routes>
          <Route path='/login' element={<SignInPage />} />
          <Route path='/register' element={<SignUpPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password/:Token' element={<ResetPasswordPage />} />
          <Route path='/email-validation' element={<EmailValidationPage />} />
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/product/:id' element={<ProductDetail />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
