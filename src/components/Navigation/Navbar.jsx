import React, { useState } from 'react';
import './NavigationStyles.css';

const Navbar = ({ onMenuClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => alert('Go to Dashboard')}>
        GreenStore
      </div>
      <div className="navbar-links">
        <a href="#" className="navbar-link">Home</a>
        <a href="#" className="navbar-link">Products</a>
        <a href="#" className="navbar-link">About</a>
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#fff',
          }}
          onClick={onMenuClick}
        >
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
