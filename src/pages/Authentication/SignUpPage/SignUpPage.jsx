// src/pages/SignUpPage.jsx

import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  message,
  Spin,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../redux/actions/authAction.js';
import {
  validatePassword,
  validatePasswordConfirm,
} from '../../../utils/validateForm.js';
import './SignUpPage.css';

const { Title, Text } = Typography;

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);
  const { loading, error, isRegistered } = authState;

  const [passwordValidation, setPasswordValidation] = useState({
    uppercase: false,
    lowercase: false,
    specialChar: false,
    length: false,
  });
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if (isRegistered) {
      message.success('Registration successful! Please verify your email.');
      
    }
  }, [isRegistered, navigate]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handlePasswordChange = (password) => {
    const validations = {
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      length: password.length >= 8,
    };

    setPasswordValidation(validations);
  };

  const onFinish = async (values) => {
    if (!agreeTerms) {
      message.error('You must agree to the terms and conditions.');
      return;
    }

    const passwordError = validatePassword(values.password);
    const confirmPasswordError = validatePasswordConfirm(
      values.password,
      values.confirmPassword
    );

    if (passwordError || confirmPasswordError) {
      message.error('Please fix the errors in the form.');
      return;
    }

    try {
      await dispatch(
        register({
          username: values.username,
          email: values.email,
          password: values.password,
        })
      );
      message.success('Registration successful! Please verify your email.');
    } catch (err) {
      message.error(err.message || 'Registration failed. Please try again.');
    } finally {
      navigate('/email-validation');
    }
  };

  return (
    <div className="signup-container">
      {loading && (
        <div className="spinner-overlay">
          <Spin size="large" />
        </div>
      )}
      <Form
        form={form}
        layout="vertical"
        className="signup-form"
        onFinish={onFinish}
      >
        <Title level={2} className="signup-title">
          Create Your Account
        </Title>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: 'Please enter your username!' },
            {
              min: 3,
              message: 'Username must be at least 3 characters long.',
            },
            {
              pattern: /^[a-zA-Z0-9_]+$/,
              message:
                'Username can only contain letters, numbers, and underscores.',
            },
          ]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please enter your password!' },
            {
              validator: (_, value) => {
                const error = validatePassword(value);
                if (error) {
                  return Promise.reject(new Error(error));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password
            placeholder="Enter your password"
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            {
              validator: (_, value) => {
                const password = form.getFieldValue('password');
                const error = validatePasswordConfirm(password, value);
                if (error) {
                  return Promise.reject(new Error(error));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password
            placeholder="Confirm your password"
            onChange={(e) =>
              form.setFieldsValue({
                confirmPassword: e.target.value,
              })
            }
          />
        </Form.Item>

        <Form.Item>
          <div className="password-validations">
            <Text
              type={passwordValidation.uppercase ? 'success' : 'danger'}
              className="validation-text"
            >
              {passwordValidation.uppercase ? '✔' : '✘'} Contains an uppercase
              letter
            </Text>
            <Text
              type={passwordValidation.lowercase ? 'success' : 'danger'}
              className="validation-text"
            >
              {passwordValidation.lowercase ? '✔' : '✘'} Contains a lowercase
              letter
            </Text>
            <Text
              type={passwordValidation.specialChar ? 'success' : 'danger'}
              className="validation-text"
            >
              {passwordValidation.specialChar ? '✔' : '✘'} Contains a special
              character
            </Text>
            <Text
              type={passwordValidation.length ? 'success' : 'danger'}
              className="validation-text"
            >
              {passwordValidation.length ? '✔' : '✘'} Minimum 8 characters
            </Text>
          </div>
        </Form.Item>

        <Form.Item
          name="agreeTerms"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error('You must agree to the terms and conditions.')
                    ),
            },
          ]}
        >
          <Checkbox
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="agreeTerms"
          >
            I agree to the <Link to="/terms">terms and conditions</Link>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="signup-button"
            disabled={loading}
          >
            Sign Up
          </Button>
        </Form.Item>

        <Text className="signin-text">
          Already have an account?{' '}
          <Link to="/login" className="signin-link">
            Sign In
          </Link>
        </Text>
      </Form>
    </div>
  );
};

export default SignUpPage;