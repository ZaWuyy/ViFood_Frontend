// authAction.js

import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    VERIFY_EMAIL_OTP_REQUEST,
    VERIFY_EMAIL_OTP_SUCCESS,
    VERIFY_EMAIL_OTP_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    LOGOUT,
  } from '../actionTypes/authActionTypes.js';
  
  import {
    registerService,
    verifyEmailOtpService,
    loginService,
    forgotPasswordService,
    resetPasswordService,
  } from '../../services/authService.js';
  
  // Register Action
  export const register = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
      const data = await registerService(userData);
      dispatch({ type: REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: REGISTER_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Verify Email OTP Action
  export const verifyEmailOtp = (otpData) => async (dispatch) => {
    dispatch({ type: VERIFY_EMAIL_OTP_REQUEST });
    try {
      await verifyEmailOtpService(otpData);
      dispatch({ type: VERIFY_EMAIL_OTP_SUCCESS });
    } catch (error) {
      dispatch({
        type: VERIFY_EMAIL_OTP_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Login Action
  export const login = (credentials) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const data = await loginService(credentials);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Forgot Password Action
  export const forgotPassword = (email) => async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    try {
      await forgotPasswordService(email);
      dispatch({ type: FORGOT_PASSWORD_SUCCESS });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Reset Password Action
  export const resetPassword = (token, newPassword) => async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    try {
      await resetPasswordService(token, newPassword);
      dispatch({ type: RESET_PASSWORD_SUCCESS });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Logout Action
  export const logout = () => (dispatch) => {
    localStorage.removeItem('jwt');
    dispatch({ type: LOGOUT });
  };