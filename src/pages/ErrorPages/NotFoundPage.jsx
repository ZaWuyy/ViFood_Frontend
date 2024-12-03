import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="page-not-found">
      <Result
        status="404"
        title="404"
        subTitle="Trang bạn tìm kiếm không tồn tại."
        extra={<Button type="primary" className="go-home-button"><Link to="/">Về trang chủ</Link></Button>}
      />
    </div>
  );
};

export default NotFoundPage;
