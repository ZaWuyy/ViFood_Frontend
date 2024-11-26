import {
    FETCH_VOUCHERS_REQUEST,
    FETCH_VOUCHERS_SUCCESS,
    FETCH_VOUCHERS_FAILURE,
    CREATE_VOUCHER_REQUEST,
    CREATE_VOUCHER_SUCCESS,
    CREATE_VOUCHER_FAILURE,
    UPDATE_VOUCHER_REQUEST,
    UPDATE_VOUCHER_SUCCESS,
    UPDATE_VOUCHER_FAILURE,
    DELETE_VOUCHER_REQUEST,
    DELETE_VOUCHER_SUCCESS,
    DELETE_VOUCHER_FAILURE,
  } from '../actionTypes/voucherActionTypes';
  
  const initialState = {
    vouchers: [],
    loading: false,
    error: null,
  };
  
  const voucherReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_VOUCHERS_REQUEST:
      case CREATE_VOUCHER_REQUEST:
      case UPDATE_VOUCHER_REQUEST:
      case DELETE_VOUCHER_REQUEST:
        return { ...state, loading: true, error: null };
  
      case FETCH_VOUCHERS_SUCCESS:
        return { ...state, loading: false, vouchers: action.payload };
  
      case CREATE_VOUCHER_SUCCESS:
        return { ...state, loading: false, vouchers: [...state.vouchers, action.payload] };
  
      case UPDATE_VOUCHER_SUCCESS:
        return {
          ...state,
          loading: false,
          vouchers: state.vouchers.map((voucher) =>
            voucher.code === action.payload.code ? action.payload : voucher
          ),
        };
  
      case DELETE_VOUCHER_SUCCESS:
        return {
          ...state,
          loading: false,
          vouchers: state.vouchers.filter((voucher) => voucher.code !== action.payload),
        };
  
      case FETCH_VOUCHERS_FAILURE:
      case CREATE_VOUCHER_FAILURE:
      case UPDATE_VOUCHER_FAILURE:
      case DELETE_VOUCHER_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default voucherReducer;
  