// paymentReducer.js

import {
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAILURE,
    PAYMENT_RETURN_REQUEST,
    PAYMENT_RETURN_SUCCESS,
    PAYMENT_RETURN_FAILURE,
    GET_PAYMENT_HISTORY_REQUEST,
    GET_PAYMENT_HISTORY_SUCCESS,
    GET_PAYMENT_HISTORY_FAILURE
  } from '../actionTypes/paymentActionTypes.js';
  
  const initialState = {
    payments: [],
    currentPayment: null,
    loading: false,
    error: null
  };
  
  const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
      // Yêu cầu thanh toán VNPay
      case CREATE_PAYMENT_REQUEST:
        return { ...state, loading: true, error: null };
      case CREATE_PAYMENT_SUCCESS:
        return { ...state, loading: false, payments: [...state.payments, action.payload] };
      case CREATE_PAYMENT_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Xử lý kết quả thanh toán từ VNPay
      case PAYMENT_RETURN_REQUEST:
        return { ...state, loading: true, error: null };
      case PAYMENT_RETURN_SUCCESS:
        return { ...state, loading: false, currentPayment: action.payload };
      case PAYMENT_RETURN_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Lấy lịch sử thanh toán của người dùng
      case GET_PAYMENT_HISTORY_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_PAYMENT_HISTORY_SUCCESS:
        return { ...state, loading: false, payments: action.payload };
      case GET_PAYMENT_HISTORY_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default paymentReducer;