// authReducer.js
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
  
  const initialState = {
    loading: false,
    user: null,
    token: localStorage.getItem('jwt') || null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      // Register
      case REGISTER_REQUEST:
        return { ...state, loading: true, error: null };
      case REGISTER_SUCCESS:
        return { ...state, loading: false, user: action.payload };
      case REGISTER_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Verify Email OTP
      case VERIFY_EMAIL_OTP_REQUEST:
        return { ...state, loading: true, error: null };
      case VERIFY_EMAIL_OTP_SUCCESS:
        return { ...state, loading: false };
      case VERIFY_EMAIL_OTP_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Login
      case LOGIN_REQUEST:
        return { ...state, loading: true, error: null };
      case LOGIN_SUCCESS:
        localStorage.setItem('jwt', action.payload.token);
        return { ...state, loading: false, user: action.payload.user, token: action.payload.token };
      case LOGIN_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Forgot Password
      case FORGOT_PASSWORD_REQUEST:
        return { ...state, loading: true, error: null };
      case FORGOT_PASSWORD_SUCCESS:
        return { ...state, loading: false };
      case FORGOT_PASSWORD_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Reset Password
      case RESET_PASSWORD_REQUEST:
        return { ...state, loading: true, error: null };
      case RESET_PASSWORD_SUCCESS:
        return { ...state, loading: false };
      case RESET_PASSWORD_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Logout
      case LOGOUT:
        localStorage.removeItem('jwt');
        return { ...state, user: null, token: null };
  
      default:
        return state;
    }
  };
  
  export default authReducer;