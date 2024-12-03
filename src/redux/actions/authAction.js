// authAction.js
import axios from 'axios';
import { API_BASE_URL} from '../../api/api.js';

import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    RESEND_OTP_REQUEST,
    RESEND_OTP_SUCCESS,
    RESEND_OTP_FAILURE,
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
  
  // Register Action
  export const register = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/auths/register`, userData);
      dispatch({ type: REGISTER_SUCCESS, payload: data });
 
    } catch (error) {
      if (error.response) {
        console.log("Error response data: ", error.response.data);
        console.log("Error response status: ", error.response.status);
  
        if (error.response.status === 406) {
          dispatch({ type: REGISTER_FAILURE, payload: error.response.data.message });
        } else {
          dispatch({ type: REGISTER_FAILURE, payload: error.message });
        }
      } else {
        console.log("No response from server");
        dispatch({ type: REGISTER_FAILURE, payload: "No response from server" });
      }
    }
  };
  //
  // Resend OTP Action
  export const resendOtp = (email) => async (dispatch) => {
    dispatch({ type: RESEND_OTP_REQUEST });
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/auths/resend-otp`, { email });
      dispatch({ type: RESEND_OTP_SUCCESS });
      return { payload: data };
    } catch (error) {
      dispatch({
        type: RESEND_OTP_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Verify Email OTP Action
  export const verifyEmailOtp = (otpData) => async (dispatch) => {
    dispatch({ type: VERIFY_EMAIL_OTP_REQUEST });
    try {
     const {data} = await axios.post(`${API_BASE_URL}/api/auths/verify-email-otp`, otpData);
      dispatch({ type: VERIFY_EMAIL_OTP_SUCCESS });
      return { payload: data };
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
      const { data } = await axios.post(`${API_BASE_URL}/api/auths/login`, credentials);
      if (data.token) {
        localStorage.setItem("jwt", data.token);
      }
      console.log("Login data: ", data.token );
      dispatch({ type: LOGIN_SUCCESS, payload: data.token });
      return { payload: data };
    } catch (error) {
      if (error.response) {
        console.log("Error response data: ", error.response.data);
        console.log("Error response status: ", error.response.status);
  
        if (error.response.status === 403) {
          dispatch({ type: LOGIN_FAILURE, payload: error.response.data.message });
        } else {
          dispatch({ type: LOGIN_FAILURE, payload: error.response.data.message });
        }
      } else {
        console.log("No response from server");
        dispatch({ type: LOGIN_FAILURE, payload: "No response from server" });
      }
    }
  };
  // Forgot Password Action
  export const forgotPassword = (email) => async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/auths/forgot-password`, { email });
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
      console.log("Api error: ", error.message);
      dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error.message });
    }
  };
  
  // Reset Password Action
  export const resetPassword = (code, newPassword) => async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    try {
      const { data } = await axios.put(`${API_BASE_URL}/api/auths/reset-password/${code}`, { newPassword });
  
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
      console.log("Api error: ", error.message);
      dispatch({ type: RESET_PASSWORD_FAILURE, payload: error.message });
    }
  };
  
  // Logout Action
  export const logoutAction = () => ({
    type: LOGOUT,
  });