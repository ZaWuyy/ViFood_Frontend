// LoadingSpinner.jsx

import React from 'react';
import { Spin } from 'antd';


const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-overlay">
      <Spin size="large" tip="Đang tải..." />
    </div>
  );
};

export default LoadingSpinner;