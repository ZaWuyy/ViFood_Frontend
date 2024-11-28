// orderDetailReducer.js
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

const initialState = {
  orderDetails: [],
  currentOrderDetail: null,
  loading: false,
  error: null,
};

const orderDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    // Tạo mới chi tiết đơn hàng
    case CREATE_ORDER_DETAIL_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_ORDER_DETAIL_SUCCESS:
      return { ...state, loading: false, orderDetails: [...state.orderDetails, action.payload] };
    case CREATE_ORDER_DETAIL_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Lấy tất cả chi tiết đơn hàng
    case GET_ALL_ORDER_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ALL_ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, orderDetails: action.payload };
    case GET_ALL_ORDER_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Lấy chi tiết đơn hàng theo ID
    case GET_ORDER_DETAIL_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ORDER_DETAIL_BY_ID_SUCCESS:
      return { ...state, loading: false, currentOrderDetail: action.payload };
    case GET_ORDER_DETAIL_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Cập nhật chi tiết đơn hàng
    case UPDATE_ORDER_DETAIL_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        orderDetails: state.orderDetails.map(orderDetail =>
          orderDetail.id === action.payload.id ? action.payload : orderDetail
        ),
        currentOrderDetail:
          state.currentOrderDetail && state.currentOrderDetail.id === action.payload.id
            ? action.payload
            : state.currentOrderDetail,
      };
    case UPDATE_ORDER_DETAIL_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Xóa chi tiết đơn hàng
    case DELETE_ORDER_DETAIL_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        orderDetails: state.orderDetails.filter(orderDetail => orderDetail.id !== action.payload),
        currentOrderDetail:
          state.currentOrderDetail && state.currentOrderDetail.id === action.payload
            ? null
            : state.currentOrderDetail,
      };
    case DELETE_ORDER_DETAIL_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default orderDetailReducer;