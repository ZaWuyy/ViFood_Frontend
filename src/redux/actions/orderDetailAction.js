// orderDetailAction.js

import {
    CREATE_ORDER_DETAIL_REQUEST,
    CREATE_ORDER_DETAIL_SUCCESS,
    CREATE_ORDER_DETAIL_FAILURE,
    GET_ALL_ORDER_DETAILS_REQUEST,
    GET_ALL_ORDER_DETAILS_SUCCESS,
    GET_ALL_ORDER_DETAILS_FAILURE,
    GET_ORDER_DETAIL_BY_ID_REQUEST,
    GET_ORDER_DETAIL_BY_ID_SUCCESS,
    GET_ORDER_DETAIL_BY_ID_FAILURE,
    UPDATE_ORDER_DETAIL_REQUEST,
    UPDATE_ORDER_DETAIL_SUCCESS,
    UPDATE_ORDER_DETAIL_FAILURE,
    DELETE_ORDER_DETAIL_REQUEST,
    DELETE_ORDER_DETAIL_SUCCESS,
    DELETE_ORDER_DETAIL_FAILURE,
  } from '../actionTypes/orderDetailActionTypes.js';
  
  import {
    createOrderDetailService,
    getAllOrderDetailsService,
    getOrderDetailByIdService,
    updateOrderDetailService,
    deleteOrderDetailService,
  } from '../../services/orderDetailService.js';
  
  // Create a New Order Detail
  export const createOrderDetail = (orderDetailData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_DETAIL_REQUEST });
    try {
      const newOrderDetail = await createOrderDetailService(orderDetailData);
      dispatch({ type: CREATE_ORDER_DETAIL_SUCCESS, payload: newOrderDetail });
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_DETAIL_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get All Order Details
  export const getAllOrderDetails = () => async (dispatch) => {
    dispatch({ type: GET_ALL_ORDER_DETAILS_REQUEST });
    try {
      const orderDetails = await getAllOrderDetailsService();
      dispatch({ type: GET_ALL_ORDER_DETAILS_SUCCESS, payload: orderDetails });
    } catch (error) {
      dispatch({
        type: GET_ALL_ORDER_DETAILS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get Order Detail by ID
  export const getOrderDetailById = (id) => async (dispatch) => {
    dispatch({ type: GET_ORDER_DETAIL_BY_ID_REQUEST });
    try {
      const orderDetail = await getOrderDetailByIdService(id);
      dispatch({ type: GET_ORDER_DETAIL_BY_ID_SUCCESS, payload: orderDetail });
    } catch (error) {
      dispatch({
        type: GET_ORDER_DETAIL_BY_ID_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Update an Existing Order Detail
  export const updateOrderDetail = (id, orderDetailData) => async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_DETAIL_REQUEST });
    try {
      const updatedOrderDetail = await updateOrderDetailService(id, orderDetailData);
      dispatch({ type: UPDATE_ORDER_DETAIL_SUCCESS, payload: updatedOrderDetail });
    } catch (error) {
      dispatch({
        type: UPDATE_ORDER_DETAIL_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Delete an Order Detail
  export const deleteOrderDetail = (id) => async (dispatch) => {
    dispatch({ type: DELETE_ORDER_DETAIL_REQUEST });
    try {
      await deleteOrderDetailService(id);
      dispatch({ type: DELETE_ORDER_DETAIL_SUCCESS, payload: id });
    } catch (error) {
      dispatch({
        type: DELETE_ORDER_DETAIL_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };