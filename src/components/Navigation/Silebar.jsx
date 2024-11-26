import React from 'react';
import './NavigationStyles.css';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? 'show' : ''}`}>
      <div className="sidebar-header">Navigation</div>
      <ul className="sidebar-links">
        <li>
          <a href="#" className="sidebar-link">
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="sidebar-link">
            Categories
          </a>
        </li>
        <li>
          <a href="#" className="sidebar-link">
            Products
          </a>
        </li>
        <li>
          <a href="#" className="sidebar-link">
            Orders
          </a>
        </li>
        <li>
          <a href="#" className="sidebar-link">
            Users
          </a>
        </li>
      </ul>
      <div className="sidebar-footer">© 2024 GreenStore</div>
    </div>
  );
};

export default Sidebar;
