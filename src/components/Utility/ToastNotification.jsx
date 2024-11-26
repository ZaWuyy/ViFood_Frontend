import React, { useState, useEffect } from 'react';
import './UtilityStyles.css';

const ToastNotification = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(), 300); // Wait for the hide animation to complete
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, type]);

  return (
    <div className={`toast ${isVisible ? 'show' : ''} ${type}`}>
      {message}
    </div>
  );
};

export default ToastNotification;
