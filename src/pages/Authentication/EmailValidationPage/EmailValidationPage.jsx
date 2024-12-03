import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmailOtp, resendOtp } from '../../../redux/actions/authAction.js';
import { useNavigate } from 'react-router-dom';
import './EmailValidationPage.css';

const { Title, Text } = Typography;

const EmailValidationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);
  const { loading, error, isEmailVerified, user } = authState;

  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (isEmailVerified) {
      message.success('Xác thực thành công!');
    }
    if (error) {
      message.error(error);
    }
  }, [isEmailVerified, error]);

  const handleOtpSubmit = async () => {
    const email = user?.newUser?.email;
    if (!otp) {
      message.error('Vui lòng nhập mã OTP!');
      return;
    }

    try {
      await dispatch(verifyEmailOtp({ email, otp }));
      message.success('OTP đã được xác thực thành công!');
      navigate('/login');
    } catch (err) {
      message.error(err.message || 'Xác thực OTP thất bại. Vui lòng thử lại.');
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    const email = user?.newUser?.email;
    if (!email) {
      message.error('Email không hợp lệ để gửi lại OTP.');
      return;
    }

    try {
      await dispatch(resendOtp(email));
      message.success('Mã OTP mới đã được gửi đến email của bạn.');
    } catch (err) {
      message.error(err.message || 'Gửi lại mã OTP thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="email-validation-container">
      <Form
        layout="vertical"
        className="email-validation-form"
        onFinish={handleOtpSubmit}
      >
        <Title level={2} className="email-validation-title">
          Nhập Mã OTP
        </Title>

        <Form.Item
          label="Mã OTP"
          name="otp"
          rules={[{ required: true, message: 'Vui lòng nhập mã OTP!' }]}
        >
          <Input
            placeholder="Nhập mã OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="verify-otp-button"
            loading={loading}
            disabled={loading}
          >
            Xác thực OTP
          </Button>
        </Form.Item>

        <Text className="resend-otp-text">
          <a href="#" onClick={handleResendOtp} className="resend-otp-link">
            Gửi lại mã OTP
          </a>
        </Text>
      </Form>
    </div>
  );
};

export default EmailValidationPage;
