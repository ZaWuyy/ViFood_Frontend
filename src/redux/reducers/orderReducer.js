// orderReducer.js

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
    DELETE_ORDER_FAILURE
  } from '../actionTypes/orderActionTypes.js';
  
  const initialState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      // Tạo mới đơn hàng
      case CREATE_ORDER_REQUEST:
        return { ...state, loading: true, error: null };
      case CREATE_ORDER_SUCCESS:
        return { ...state, loading: false, orders: [...state.orders, action.payload] };
      case CREATE_ORDER_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Lấy tất cả đơn hàng (Admin)
      case GET_ALL_ORDERS_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_ALL_ORDERS_SUCCESS:
        return { ...state, loading: false, orders: action.payload };
      case GET_ALL_ORDERS_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Lấy đơn hàng của người dùng
      case GET_USER_ORDERS_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_USER_ORDERS_SUCCESS:
        return { ...state, loading: false, orders: action.payload };
      case GET_USER_ORDERS_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Lấy đơn hàng theo ID
      case GET_ORDER_BY_ID_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_ORDER_BY_ID_SUCCESS:
        return { ...state, loading: false, currentOrder: action.payload };
      case GET_ORDER_BY_ID_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Cập nhật trạng thái đơn hàng
      case UPDATE_ORDER_STATUS_REQUEST:
        return { ...state, loading: true, error: null };
      case UPDATE_ORDER_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          orders: state.orders.map(order =>
            order.id === action.payload.id ? action.payload : order
          ),
          currentOrder:
            state.currentOrder && state.currentOrder.id === action.payload.id
              ? action.payload
              : state.currentOrder,
        };
      case UPDATE_ORDER_STATUS_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Xóa đơn hàng
      case DELETE_ORDER_REQUEST:
        return { ...state, loading: true, error: null };
      case DELETE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          orders: state.orders.filter(order => order.id !== action.payload),
          currentOrder:
            state.currentOrder && state.currentOrder.id === action.payload
              ? null
              : state.currentOrder,
        };
      case DELETE_ORDER_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default orderReducer;