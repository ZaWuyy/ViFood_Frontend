// cartAction.js

import {
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILURE,
    REMOVE_FROM_CART_REQUEST,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAILURE,
    GET_CART_REQUEST,
    GET_CART_SUCCESS,
    GET_CART_FAILURE,
  } from '../actionTypes/cartActionTypes.js';
  
  import {
    addToCartService,
    removeFromCartService,
    getCartService,
  } from '../../services/cartService.js';
  
  // Add Item to Cart
  export const addToCart = (item) => async (dispatch) => {
    dispatch({ type: ADD_TO_CART_REQUEST });
    try {
      const data = await addToCartService(item);
      dispatch({ type: ADD_TO_CART_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_TO_CART_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Remove Item from Cart
  export const removeFromCart = (itemId) => async (dispatch) => {
    dispatch({ type: REMOVE_FROM_CART_REQUEST });
    try {
      await removeFromCartService(itemId);
      dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: itemId });
    } catch (error) {
      dispatch({
        type: REMOVE_FROM_CART_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get User Cart
  export const getCart = () => async (dispatch) => {
    dispatch({ type: GET_CART_REQUEST });
    try {
      const data = await getCartService();
      dispatch({ type: GET_CART_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_CART_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };