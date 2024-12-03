// authService.js
import axios from "axios";



// Register a new user
export const registerService = async (userData) => {
  return axios.post(`${BASE_URL}/register`, userData);
};
// resend-otp
export const resendOtpService = async (email) => {
  return axios.post(`${BASE_URL}/resend-otp`, { email });
}

// Verify email OTP
export const verifyEmailOtpService = async (otpData) => {
  return axios.post(`${BASE_URL}/verify-email-otp`, otpData);
};

// Login a user
export const loginService = async (credentials) => {
  const data = await axios.post(`${BASE_URL}/login`, credentials);
  const { token } = data;
  localStorage.setItem('jwt', token);
  return data;
};

// Forgot password
export const forgotPasswordService = async (email) => {
  return axios.post(`${BASE_URL}/forgot-password`, { email });
};

// Reset password
export const resetPasswordService = async (token, newPassword) => {
  return axios.put(`${BASE_URL}/reset-password/${token}`, { password: newPassword });
};