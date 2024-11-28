// voucherReducer.js

import {
  FETCH_VOUCHERS_REQUEST,
  FETCH_VOUCHERS_SUCCESS,
  FETCH_VOUCHERS_FAILURE,
  FETCH_VOUCHER_BY_CODE_REQUEST,
  FETCH_VOUCHER_BY_CODE_SUCCESS,
  FETCH_VOUCHER_BY_CODE_FAILURE,
  CREATE_VOUCHER_REQUEST,
  CREATE_VOUCHER_SUCCESS,
  CREATE_VOUCHER_FAILURE,
  UPDATE_VOUCHER_REQUEST,
  UPDATE_VOUCHER_SUCCESS,
  UPDATE_VOUCHER_FAILURE,
  DELETE_VOUCHER_REQUEST,
  DELETE_VOUCHER_SUCCESS,
  DELETE_VOUCHER_FAILURE,
  GET_VOUCHERS_BY_USER_REQUEST,
  GET_VOUCHERS_BY_USER_SUCCESS,
  GET_VOUCHERS_BY_USER_FAILURE
} from '../actionTypes/voucherActionTypes.js';

const initialState = {
  vouchers: [],
  currentVoucher: null,
  loading: false,
  error: null
};

const voucherReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch all vouchers
    case FETCH_VOUCHERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_VOUCHERS_SUCCESS:
      return { ...state, loading: false, vouchers: action.payload };
    case FETCH_VOUCHERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Fetch voucher by code
    case FETCH_VOUCHER_BY_CODE_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_VOUCHER_BY_CODE_SUCCESS:
      return { ...state, loading: false, currentVoucher: action.payload };
    case FETCH_VOUCHER_BY_CODE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Create voucher
    case CREATE_VOUCHER_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_VOUCHER_SUCCESS:
      return {
        ...state,
        loading: false,
        vouchers: [...state.vouchers, action.payload]
      };
    case CREATE_VOUCHER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Update voucher
    case UPDATE_VOUCHER_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_VOUCHER_SUCCESS:
      return {
        ...state,
        loading: false,
        vouchers: state.vouchers.map(voucher =>
          voucher.id === action.payload.id ? action.payload : voucher
        ),
        currentVoucher:
          state.currentVoucher?.id === action.payload.id
            ? action.payload
            : state.currentVoucher
      };
    case UPDATE_VOUCHER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Delete voucher
    case DELETE_VOUCHER_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_VOUCHER_SUCCESS:
      return {
        ...state,
        loading: false,
        vouchers: state.vouchers.filter(voucher => voucher.id !== action.payload),
        currentVoucher:
          state.currentVoucher?.id === action.payload
            ? null
            : state.currentVoucher
      };
    case DELETE_VOUCHER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Get user vouchers
    case GET_VOUCHERS_BY_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_VOUCHERS_BY_USER_SUCCESS:
      return { ...state, loading: false, vouchers: action.payload };
    case GET_VOUCHERS_BY_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default voucherReducer;