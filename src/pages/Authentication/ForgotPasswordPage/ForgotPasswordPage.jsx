// src/pages/ForgotPasswordPage.jsx

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../../redux/actions/authAction.js';
import './ForgotPasswordPage.css';

const { Title, Text } = Typography;

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);
  const { loading, error, forgotPasswordSuccess } = authState;

  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (forgotPasswordSuccess) {
      setEmailSent(true);
      message.success('Đã gửi email yêu cầu reset mật khẩu');
    }
    if (error) {
      message.error(error);
    }
  }, [forgotPasswordSuccess, error]);

  const handleEmailSubmit = async (values) => {
    try {
      await dispatch(forgotPassword(values.email));
      message.success('Email xác nhận đã được gửi, vui lòng kiểm tra hộp thư của bạn.');
    } catch (err) {
      message.error(err.message || 'Gửi email xác nhận thất bại. Vui lòng thử lại.');
    }
  };
  
  const handleResendEmail = async () => {
    try {
      await dispatch(forgotPassword(email));
      message.success('Email xác nhận đã được gửi lại thành công.');
    } catch (err) {
      message.error(err.message || 'Gửi lại email xác nhận thất bại. Vui lòng thử lại.');
    }
  };
  

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="forgot-password-container">
      <Form
        layout="vertical"
        className="forgot-password-form"
        onFinish={handleEmailSubmit}
      >
        <Title level={2} className="forgot-password-title">Quên Mật Khẩu</Title>

        {!emailSent ? (
          <>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email của bạn!' },
                { type: 'email', message: 'Vui lòng nhập email hợp lệ!' },
              ]}
            >
              <Input
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="send-email-button"
                loading={loading}
              >
                Gửi Yêu Cầu Reset Mật Khẩu
              </Button>
            </Form.Item>
          </>
        ) : (
          <>
            <Text className="confirmation-text">
              Một email đã được gửi đến {email}. Vui lòng kiểm tra hộp thư đến để reset mật khẩu.
            </Text>
            <Form.Item>
              <Button
                type="default"
                className="resend-email-button"
                onClick={handleResendEmail}
                loading={loading}
              >
                Gửi Lại Email
              </Button>
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button
            type="link"
            onClick={handleBackToLogin}
            className="back-to-login-button"
          >
            Quay lại trang đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPasswordPage;