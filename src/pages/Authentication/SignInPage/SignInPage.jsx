import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/actions/authAction.js';
import './SignInPage.css';

const { Title, Text } = Typography;

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);
  const { loading, error, isAuthenticated } = authState;

  const [form] = Form.useForm();
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Pre-fill email if saved in localStorage
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      form.setFieldsValue({ email: savedEmail });
      setRememberMe(true);
    }
  }, [form]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      message.success('Logged in successfully!');
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onFinish = async (values) => {
    const { email, password } = values;

    try {
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      await dispatch(login({ email, password }));
      message.success('Logged in successfully!');
      navigate('/');
    } catch (err) {
      message.error(err.message || 'Failed to log in. Please check your credentials and try again.');
    }
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className="signin-container">
      <Form
        layout="vertical"
        className="signin-form"
        form={form}
        onFinish={onFinish}
      >
        <Title level={2} className="signin-title">Sign In</Title>

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
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" className="remember-me">
          <Checkbox checked={rememberMe} onChange={handleRememberMeChange}>
            Remember Me
          </Checkbox>
        </Form.Item>

        {error && (
          <Form.Item>
            <Text type="danger">{error}</Text>
          </Form.Item>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="signin-button"
            loading={loading}
            disabled={loading}
          >
            Sign In
          </Button>
        </Form.Item>

        <Text>
          <Link to="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </Link>
        </Text>
        <br />
        <Text>
          I don't have an account? <Link to="/register" className="signup-link">Sign Up</Link>
        </Text>
      </Form>
    </div>
  );
};

export default SignInPage;
