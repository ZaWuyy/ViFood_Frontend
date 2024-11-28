// paymentAction.js

import {
    REQUEST_PAYMENT_REQUEST,
    REQUEST_PAYMENT_SUCCESS,
    REQUEST_PAYMENT_FAILURE,
    PAYMENT_RETURN_REQUEST,
    PAYMENT_RETURN_SUCCESS,
    PAYMENT_RETURN_FAILURE,
    GET_PAYMENT_HISTORY_REQUEST,
    GET_PAYMENT_HISTORY_SUCCESS,
    GET_PAYMENT_HISTORY_FAILURE,
  } from '../actionTypes/paymentActionTypes.js';
  
  import {
    requestPaymentService,
    paymentReturnService,
    getPaymentHistoryService,
  } from '../../services/paymentService.js';
  
  // Request Payment
  export const requestPayment = (paymentData) => async (dispatch) => {
    dispatch({ type: REQUEST_PAYMENT_REQUEST });
    try {
      const data = await requestPaymentService(paymentData);
      dispatch({ type: REQUEST_PAYMENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: REQUEST_PAYMENT_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Handle Payment Return
  export const handlePaymentReturn = () => async (dispatch) => {
    dispatch({ type: PAYMENT_RETURN_REQUEST });
    try {
      const data = await paymentReturnService();
      dispatch({ type: PAYMENT_RETURN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PAYMENT_RETURN_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get Payment History
  export const getPaymentHistory = () => async (dispatch) => {
    dispatch({ type: GET_PAYMENT_HISTORY_REQUEST });
    try {
      const data = await getPaymentHistoryService();
      dispatch({ type: GET_PAYMENT_HISTORY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_PAYMENT_HISTORY_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };