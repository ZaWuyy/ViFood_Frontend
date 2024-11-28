// productReducer.js

import {
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS, 
    GET_PRODUCTS_FAILURE,
    GET_PRODUCT_BY_ID_REQUEST,
    GET_PRODUCT_BY_ID_SUCCESS,
    GET_PRODUCT_BY_ID_FAILURE,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    GET_PRODUCTS_BY_USER_REQUEST,
    GET_PRODUCTS_BY_USER_SUCCESS,
    GET_PRODUCTS_BY_USER_FAILURE
  } from '../actionTypes/productActionTypes.js';
  
  const initialState = {
    products: [],
    currentProduct: null,
    loading: false,
    error: null
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      // Lấy tất cả sản phẩm
      case GET_PRODUCTS_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_PRODUCTS_SUCCESS:
        return { ...state, loading: false, products: action.payload };
      case GET_PRODUCTS_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Lấy sản phẩm theo ID
      case GET_PRODUCT_BY_ID_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_PRODUCT_BY_ID_SUCCESS:
        return { ...state, loading: false, currentProduct: action.payload };
      case GET_PRODUCT_BY_ID_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Tạo mới sản phẩm
      case CREATE_PRODUCT_REQUEST:
        return { ...state, loading: true, error: null };
      case CREATE_PRODUCT_SUCCESS:
        return { ...state, loading: false, products: [...state.products, action.payload] };
      case CREATE_PRODUCT_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Cập nhật sản phẩm
      case UPDATE_PRODUCT_REQUEST:
        return { ...state, loading: true, error: null };
      case UPDATE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          products: state.products.map(product =>
            product.id === action.payload.id ? action.payload : product
          ),
          currentProduct: 
            state.currentProduct?.id === action.payload.id 
              ? action.payload 
              : state.currentProduct
        };
      case UPDATE_PRODUCT_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Xóa sản phẩm
      case DELETE_PRODUCT_REQUEST:
        return { ...state, loading: true, error: null };
      case DELETE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          products: state.products.filter(product => product.id !== action.payload),
          currentProduct: 
            state.currentProduct?.id === action.payload 
              ? null 
              : state.currentProduct
        };
      case DELETE_PRODUCT_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Lấy sản phẩm của người dùng
      case GET_PRODUCTS_BY_USER_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_PRODUCTS_BY_USER_SUCCESS:
        return { ...state, loading: false, products: action.payload };
      case GET_PRODUCTS_BY_USER_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default productReducer;