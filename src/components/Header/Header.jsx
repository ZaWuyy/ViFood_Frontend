import React, { useState, useEffect, useRef } from 'react';
import './Header.css';

const Header = () => {
  const banners = [
    '/header_img.png',
    '/header2_img.png',
    '/header3_img.png'
  ]; 

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null); 

  
  const startAutoSlide = () => {
    
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 3000); 
    }
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); 
      intervalRef.current = null; 
    }
  };


  useEffect(() => {
    startAutoSlide(); 
    return () => stopAutoSlide(); 
  }, []);


  const nextBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };


  const prevBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  return (
    <div
      className='header'
      style={{ backgroundImage: `url(${banners[currentIndex]})` }}
      onMouseEnter={stopAutoSlide} 
      onMouseLeave={startAutoSlide} 
    >

      {currentIndex === 0 && (
        <div className="header-contents">
          <p>Tinh hoa ẩm thực và hơn thế nữa...</p>
          <button>Đặt món ngay</button>
        </div>
      )}


      <button className="prev-button" onClick={prevBanner}>&#10094;</button>
      <button className="next-button" onClick={nextBanner}>&#10095;</button>

      <div className="dots">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Header;
