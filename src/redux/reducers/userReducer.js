// userReducer.js

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
    REMOVE_FAVORITE_PRODUCT_FAILURE
  } from '../actionTypes/userActionTypes.js';
  
  const initialState = {
    users: [],
    currentUser: null,
    loading: false,
    error: null
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      // Profile operations
      case FETCH_PROFILE_REQUEST:
      case UPDATE_PROFILE_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_PROFILE_SUCCESS:
      case UPDATE_PROFILE_SUCCESS:
        return { ...state, loading: false, currentUser: action.payload };
      case FETCH_PROFILE_FAILURE:
      case UPDATE_PROFILE_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Email verification
      case SEND_VERIFICATION_EMAIL_REQUEST:
      case VERIFY_EMAIL_REQUEST:
        return { ...state, loading: true, error: null };
      case SEND_VERIFICATION_EMAIL_SUCCESS:
      case VERIFY_EMAIL_SUCCESS:
        return { ...state, loading: false };
      case SEND_VERIFICATION_EMAIL_FAILURE:
      case VERIFY_EMAIL_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Admin user operations
      case CREATE_USER_REQUEST:
      case UPDATE_USER_REQUEST:
      case DELETE_USER_REQUEST:
        return { ...state, loading: true, error: null };
      case CREATE_USER_SUCCESS:
        return { 
          ...state, 
          loading: false, 
          users: [...state.users, action.payload]
        };
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          users: state.users.map(user =>
            user.id === action.payload.id ? action.payload : user
          )
        };
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          users: state.users.filter(user => user.id !== action.payload)
        };
      case CREATE_USER_FAILURE:
      case UPDATE_USER_FAILURE:
      case DELETE_USER_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Get user/users
      case GET_USER_REQUEST:
      case GET_USERS_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_USER_SUCCESS:
        return { ...state, loading: false, currentUser: action.payload };
      case GET_USERS_SUCCESS:
        return { ...state, loading: false, users: action.payload };
      case GET_USER_FAILURE:
      case GET_USERS_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Voucher management
      case ADD_VOUCHER_REQUEST:
      case REMOVE_VOUCHER_REQUEST:
        return { ...state, loading: true, error: null };
      case ADD_VOUCHER_SUCCESS:
      case REMOVE_VOUCHER_SUCCESS:
        return {
          ...state,
          loading: false,
          currentUser: {
            ...state.currentUser,
            vouchers: action.payload
          }
        };
      case ADD_VOUCHER_FAILURE:
      case REMOVE_VOUCHER_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Favorite products
      case ADD_FAVORITE_PRODUCT_REQUEST:
      case REMOVE_FAVORITE_PRODUCT_REQUEST:
        return { ...state, loading: true, error: null };
      case ADD_FAVORITE_PRODUCT_SUCCESS:
      case REMOVE_FAVORITE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          currentUser: {
            ...state.currentUser,
            favoriteProducts: action.payload
          }
        };
      case ADD_FAVORITE_PRODUCT_FAILURE:
      case REMOVE_FAVORITE_PRODUCT_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default userReducer;