// productAction.js

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
    GET_PRODUCTS_BY_USER_FAILURE,
  } from '../actionTypes/productActionTypes.js';
  
  import {
    getProductsService,
    getProductByIdService,
    createProductService,
    updateProductService,
    deleteProductService,
    getProductsByUserService,
  } from '../../services/productService.js';
  
  // Get All Products
  export const getProducts = () => async (dispatch) => {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    try {
      const products = await getProductsService();
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get Product by ID
  export const getProductById = (id) => async (dispatch) => {
    dispatch({ type: GET_PRODUCT_BY_ID_REQUEST });
    try {
      const product = await getProductByIdService(id);
      dispatch({ type: GET_PRODUCT_BY_ID_SUCCESS, payload: product });
    } catch (error) {
      dispatch({
        type: GET_PRODUCT_BY_ID_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Create a New Product
  export const createProduct = (productData) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    try {
      const newProduct = await createProductService(productData);
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: newProduct });
    } catch (error) {
      dispatch({
        type: CREATE_PRODUCT_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Update an Existing Product
  export const updateProduct = (id, productData) => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    try {
      const updatedProduct = await updateProductService(id, productData);
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: updatedProduct });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Delete a Product
  export const deleteProduct = (id) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    try {
      await deleteProductService(id);
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get Products by User
  export const getProductsByUser = () => async (dispatch) => {
    dispatch({ type: GET_PRODUCTS_BY_USER_REQUEST });
    try {
      const products = await getProductsByUserService();
      dispatch({ type: GET_PRODUCTS_BY_USER_SUCCESS, payload: products });
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_BY_USER_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };