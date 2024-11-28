// authService.js
import apiClient from './apiClient.js';

const BASE_URL = '/api/auths';


// Register a new user
export const registerService = async (userData) => {
  return apiClient.post(`${BASE_URL}/register`, userData, false);
};

// Verify email OTP
export const verifyEmailOtpService = async (otpData) => {
  return apiClient.post(`${BASE_URL}/verify-email-otp`, otpData, false);
};

// Login a user
export const loginService = async (credentials) => {
  const data = await apiClient.post(`${BASE_URL}/login`, credentials, false);
  const { token } = data;
  localStorage.setItem('jwt', token);
  return data;
};

// Forgot password
export const forgotPasswordService = async (email) => {
  return apiClient.post(`${BASE_URL}/forgot-password`, { email }, false);
};

// Reset password
export const resetPasswordService = async (token, newPassword) => {
  return apiClient.put(`${BASE_URL}/reset-password/${token}`, { password: newPassword }, false);
};