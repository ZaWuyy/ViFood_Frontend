// orderAction.js

import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    GET_ALL_ORDERS_REQUEST,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_ORDERS_FAILURE,
    GET_USER_ORDERS_REQUEST,
    GET_USER_ORDERS_SUCCESS,
    GET_USER_ORDERS_FAILURE,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    GET_ORDER_BY_ID_FAILURE,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAILURE,
  } from '../actionTypes/orderActionTypes.js';
  
  import {
    createOrderService,
    getAllOrdersService,
    getUserOrdersService,
    getOrderByIdService,
    updateOrderStatusService,
    deleteOrderService,
  } from '../../services/orderService.js';
  
  // Create a New Order
  export const createOrder = (orderData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
      const newOrder = await createOrderService(orderData);
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: newOrder });
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get All Orders (Admin)
  export const getAllOrders = () => async (dispatch) => {
    dispatch({ type: GET_ALL_ORDERS_REQUEST });
    try {
      const orders = await getAllOrdersService();
      dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: orders });
    } catch (error) {
      dispatch({
        type: GET_ALL_ORDERS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get Orders by User
  export const getUserOrders = () => async (dispatch) => {
    dispatch({ type: GET_USER_ORDERS_REQUEST });
    try {
      const orders = await getUserOrdersService();
      dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: orders });
    } catch (error) {
      dispatch({
        type: GET_USER_ORDERS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get Order by ID
  export const getOrderById = (id) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });
    try {
      const order = await getOrderByIdService(id);
      dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: order });
    } catch (error) {
      dispatch({
        type: GET_ORDER_BY_ID_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Update Order Status
  export const updateOrderStatus = (id, statusData) => async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    try {
      const updatedOrder = await updateOrderStatusService(id, statusData);
      dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: updatedOrder });
    } catch (error) {
      dispatch({
        type: UPDATE_ORDER_STATUS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Delete an Order
  export const deleteOrder = (id) => async (dispatch) => {
    dispatch({ type: DELETE_ORDER_REQUEST });
    try {
      await deleteOrderService(id);
      dispatch({ type: DELETE_ORDER_SUCCESS, payload: id });
    } catch (error) {
      dispatch({
        type: DELETE_ORDER_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };