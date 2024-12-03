import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <Result
        status="500"
        title="500"
        subTitle="Có lỗi xảy ra, vui lòng thử lại sau."
        extra={<Button type="primary" className="go-home-button"><Link to="/">Về trang chủ</Link></Button>}
      />
    </div>
  );
};

export default ErrorPage;
