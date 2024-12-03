// userAction.js
import axios  from 'axios';
import { api, API_BASE_URL  } from '../../api/api.js';

import {
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    SEND_VERIFICATION_EMAIL_REQUEST,
    SEND_VERIFICATION_EMAIL_SUCCESS,
    SEND_VERIFICATION_EMAIL_FAILURE,
    VERIFY_EMAIL_REQUEST,
    VERIFY_EMAIL_SUCCESS,
    VERIFY_EMAIL_FAILURE,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    ADD_VOUCHER_REQUEST,
    ADD_VOUCHER_SUCCESS,
    ADD_VOUCHER_FAILURE,
    REMOVE_VOUCHER_REQUEST,
    REMOVE_VOUCHER_SUCCESS,
    REMOVE_VOUCHER_FAILURE,
    ADD_FAVORITE_PRODUCT_REQUEST,
    ADD_FAVORITE_PRODUCT_SUCCESS,
    ADD_FAVORITE_PRODUCT_FAILURE,
    REMOVE_FAVORITE_PRODUCT_REQUEST,
    REMOVE_FAVORITE_PRODUCT_SUCCESS,
    REMOVE_FAVORITE_PRODUCT_FAILURE,
  } from '../actionTypes/userActionTypes.js';
  
 
  
  // Fetch User Profile
  export const getCurrentUserByJwt = (jwt) => async (dispatch) => {
    dispatch({ type: FETCH_PROFILE_REQUEST });
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: FETCH_PROFILE_SUCCESS, payload: data });
      return { payload: data };
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({ type: FETCH_PROFILE_FAILURE, payload: "Session expired. Please sign in again." });
        return { error: "UNAUTHORIZED" };
      }
      dispatch({ type: FETCH_PROFILE_FAILURE, payload: error.message });
    }
  };
  
  // Update User Profile with Avatar Upload
  export const updateProfile = (profileData, avatarFile) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    try {
      const {data} = await api.post(`${API_BASE_URL}/users/profile`,profileData, avatarFile);
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
      return { payload: data };
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Send Verification Email
  export const sendVerificationEmail = (emailData) => async (dispatch) => {
    dispatch({ type: SEND_VERIFICATION_EMAIL_REQUEST });
    try {
      await api.post(`${API_BASE_URL}/users/send-verification-email`, {emailData});
      dispatch({ type: SEND_VERIFICATION_EMAIL_SUCCESS });
    } catch (error) {
      dispatch({
        type: SEND_VERIFICATION_EMAIL_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Verify Email
  export const verifyEmail = (token, email) => async (dispatch) => {
    dispatch({ type: VERIFY_EMAIL_REQUEST });
    try {
      const {data} = await api.post(`${API_BASE_URL}/users/verify-email`, {token, email});
      dispatch({ type: VERIFY_EMAIL_SUCCESS });
      return { payload: data };
    } catch (error) {
      dispatch({
        type: VERIFY_EMAIL_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Create a New User (Admin)
  export const createUser = (userData) => async (dispatch) => {
    dispatch({ type: CREATE_USER_REQUEST });
    try {
      const {data} = await api.post(`${API_BASE_URL}/users/create`, userData);
      dispatch({ type: CREATE_USER_SUCCESS, payload: data });
      return { payload: data };
    } catch (error) {
      dispatch({
        type: CREATE_USER_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Update a User (Admin)
  export const updateUser = (id, userData) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
      const {data} = await api.put(`${API_BASE_URL}/users/update/${id}`, userData);
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Delete a User (Admin)
  export const deleteUser = (id) => async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });
    try {
      await api.delete(`${API_BASE_URL}/users/delete/${id}`);
      dispatch({ type: DELETE_USER_SUCCESS, payload: id });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get a User by ID
  export const getUser = (id) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const {data} = await api.get(`${API_BASE_URL}/users/${id}`);
      dispatch({ type: GET_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_USER_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get Users with Search and Filter
  export const getUsers = (params) => async (dispatch) => {
    dispatch({ type: GET_USERS_REQUEST });
    try {
      const {data} = await api.get(`${API_BASE_URL}/users/`, {params});
      dispatch({ type: GET_USERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_USERS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Add Voucher to User
  export const addVoucher = (voucherData) => async (dispatch) => {
    dispatch({ type: ADD_VOUCHER_REQUEST });
    try {
      const {data} = await api.post(`${API_BASE_URL}/users//vouchers/save`, voucherData);
      dispatch({ type: ADD_VOUCHER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_VOUCHER_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Remove Voucher from User
  export const removeVoucher = (voucherData) => async (dispatch) => {
    dispatch({ type: REMOVE_VOUCHER_REQUEST });
    try {
      const {data} = await api.delete(`${API_BASE_URL}/users/vouchers/remove`, {voucherData});
      dispatch({ type: REMOVE_VOUCHER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: REMOVE_VOUCHER_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Add Favorite Product to User
  export const addFavoriteProduct = (favoriteData) => async (dispatch) => {
    dispatch({ type: ADD_FAVORITE_PRODUCT_REQUEST });
    try {
      const {data} = await api.post(`${API_BASE_URL}/users//favorites/add`, favoriteData);
      dispatch({ type: ADD_FAVORITE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_FAVORITE_PRODUCT_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Remove Favorite Product from User
  export const removeFavoriteProduct = (favoriteData) => async (dispatch) => {
    dispatch({ type: REMOVE_FAVORITE_PRODUCT_REQUEST });
    try {
      const {data} = await api.delete(`${API_BASE_URL}/users//favorites/remove`, favoriteData);
      dispatch({ type: REMOVE_FAVORITE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: REMOVE_FAVORITE_PRODUCT_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };