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
  
  import {
    fetchVouchersService,
    createVoucherService,
    updateVoucherService,
    deleteVoucherService,
  } from '../../services/voucherService';
  
  // Fetch all vouchers
  export const fetchVouchers = (filters = {}) => async (dispatch) => {
    dispatch({ type: FETCH_VOUCHERS_REQUEST });
    try {
      const data = await fetchVouchersService(filters);
      dispatch({ type: FETCH_VOUCHERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_VOUCHERS_FAILURE, payload: error.message });
    }
  };
  
  // Create a new voucher
  export const createVoucher = (voucher) => async (dispatch) => {
    dispatch({ type: CREATE_VOUCHER_REQUEST });
    try {
      const data = await createVoucherService(voucher);
      dispatch({ type: CREATE_VOUCHER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CREATE_VOUCHER_FAILURE, payload: error.message });
    }
  };
  
  // Update a voucher
  export const updateVoucher = (code, voucher) => async (dispatch) => {
    dispatch({ type: UPDATE_VOUCHER_REQUEST });
    try {
      const data = await updateVoucherService(code, voucher);
      dispatch({ type: UPDATE_VOUCHER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: UPDATE_VOUCHER_FAILURE, payload: error.message });
    }
  };
  
  // Delete a voucher
  export const deleteVoucher = (code) => async (dispatch) => {
    dispatch({ type: DELETE_VOUCHER_REQUEST });
    try {
      await deleteVoucherService(code);
      dispatch({ type: DELETE_VOUCHER_SUCCESS, payload: code });
    } catch (error) {
      dispatch({ type: DELETE_VOUCHER_FAILURE, payload: error.message });
    }
  };
  