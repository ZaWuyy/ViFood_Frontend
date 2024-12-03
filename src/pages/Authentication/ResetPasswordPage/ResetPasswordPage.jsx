// src/pages/ResetPasswordPage.jsx

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../../redux/actions/authAction.js';
import './ResetPasswordPage.css';

const { Title, Text } = Typography;

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const code  = useParams(); // Retrieve token from URL
 
  const authState = useSelector((state) => state.auth);
  const { loading, error, resetPasswordSuccess } = authState;

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordValidation, setPasswordValidation] = useState({
    uppercase: false,
    lowercase: false,
    specialChar: false,
    length: false,
  });

  useEffect(() => {
    
    if (resetPasswordSuccess) {
      message.success('Password reset successfully!');
     
    }
    if (error) {
      message.error(error);
    }
  }, [resetPasswordSuccess, error, navigate]);

  const handlePasswordChange = (password) => {
    const validations = {
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      length: password.length >= 8,
    };

    setPasswordValidation(validations);
    const strength = Object.values(validations).filter((valid) => valid).length * 25;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (values) => {
    if (values.newPassword !== values.confirmNewPassword) {
      message.error('Passwords do not match!');
      return;
    }
    console.log(values.newPassword);
    try{
      await dispatch(resetPassword(code.Token, values.newPassword));
      message.success('Password reset successfully. You can now log in with your new password.');
      navigate('/login');
    }
    catch(err){
      message.error(err.message || 'Password reset failed. Please try again.');
    }
  };

  return (
    <div className="reset-password-container">
      <Form
        layout="vertical"
        className="reset-password-form"
        onFinish={handleSubmit}
      >
        <Title level={2} className="reset-password-title">Reset Your Password</Title>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: 'Please enter your new password!' },
            {
              validator: (_, value) => {
                const validations = {
                  uppercase: /[A-Z]/.test(value || ''),
                  lowercase: /[a-z]/.test(value || ''),
                  specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value || ''),
                  length: (value || '').length >= 8,
                };
                const isValid = Object.values(validations).every(Boolean);
                if (isValid) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Password does not meet the requirements.'));
              },
            },
          ]}
        >
          <Input.Password
            placeholder="Enter your new password"
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirmNewPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Please confirm your new password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm your new password"
          />
        </Form.Item>

        <div className="password-validations">
          <Text type={passwordValidation.uppercase ? 'success' : 'danger'}>
            {passwordValidation.uppercase ? '✔' : '✘'} Contains an uppercase letter
          </Text>
          <Text type={passwordValidation.lowercase ? 'success' : 'danger'}>
            {passwordValidation.lowercase ? '✔' : '✘'} Contains a lowercase letter
          </Text>
          <Text type={passwordValidation.specialChar ? 'success' : 'danger'}>
            {passwordValidation.specialChar ? '✔' : '✘'} Contains a special character
          </Text>
          <Text type={passwordValidation.length ? 'success' : 'danger'}>
            {passwordValidation.length ? '✔' : '✘'} Minimum 8 characters
          </Text>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="reset-password-button"
            loading={loading}
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPasswordPage;