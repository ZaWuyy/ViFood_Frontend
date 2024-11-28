// voucherAction.js

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

import {
  fetchVouchersService,
  fetchVoucherByCodeService,
  createVoucherService,
  updateVoucherService,
  deleteVoucherService,
  getVouchersByUserService
} from '../../services/voucherService.js';

// Fetch Vouchers
export const fetchVouchers = (filters = {}) => async (dispatch) => {
  dispatch({ type: FETCH_VOUCHERS_REQUEST });
  try {
    const data = await fetchVouchersService(filters);
    dispatch({ type: FETCH_VOUCHERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_VOUCHERS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Fetch Voucher by Code
export const fetchVoucherByCode = (code) => async (dispatch) => {
  dispatch({ type: FETCH_VOUCHER_BY_CODE_REQUEST });
  try {
    const data = await fetchVoucherByCodeService(code);
    dispatch({ type: FETCH_VOUCHER_BY_CODE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_VOUCHER_BY_CODE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Create Voucher
export const createVoucher = (voucherData) => async (dispatch) => {
  dispatch({ type: CREATE_VOUCHER_REQUEST });
  try {
    const data = await createVoucherService(voucherData);
    dispatch({ type: CREATE_VOUCHER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_VOUCHER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update Voucher
export const updateVoucher = (code, voucherData) => async (dispatch) => {
  dispatch({ type: UPDATE_VOUCHER_REQUEST });
  try {
    const data = await updateVoucherService(code, voucherData);
    dispatch({ type: UPDATE_VOUCHER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_VOUCHER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Delete Voucher
export const deleteVoucher = (code) => async (dispatch) => {
  dispatch({ type: DELETE_VOUCHER_REQUEST });
  try {
    await deleteVoucherService(code);
    dispatch({ type: DELETE_VOUCHER_SUCCESS, payload: code });
  } catch (error) {
    dispatch({
      type: DELETE_VOUCHER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Get Vouchers by User
export const getVouchersByUser = (userId) => async (dispatch) => {
  dispatch({ type: GET_VOUCHERS_BY_USER_REQUEST });
  try {
    const data = await getVouchersByUserService(userId);
    dispatch({ type: GET_VOUCHERS_BY_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_VOUCHERS_BY_USER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};