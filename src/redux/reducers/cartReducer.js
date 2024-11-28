// cartReducer.js
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
  
  const initialState = {
    items: [],
    loading: false,
    error: null,
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      // Add to Cart
      case ADD_TO_CART_REQUEST:
        return { ...state, loading: true, error: null };
      case ADD_TO_CART_SUCCESS:
        // Check if the item already exists in the cart
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (existingItem) {
          // If it exists, update the quantity
          return {
            ...state,
            loading: false,
            items: state.items.map(item =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + action.payload.quantity }
                : item
            ),
          };
        } else {
          // If it doesn't exist, add the new item
          return {
            ...state,
            loading: false,
            items: [...state.items, action.payload],
          };
        }
      case ADD_TO_CART_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Remove from Cart
      case REMOVE_FROM_CART_REQUEST:
        return { ...state, loading: true, error: null };
      case REMOVE_FROM_CART_SUCCESS:
        return {
          ...state,
          loading: false,
          items: state.items.filter(item => item.id !== action.payload),
        };
      case REMOVE_FROM_CART_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Get Cart
      case GET_CART_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_CART_SUCCESS:
        return { ...state, loading: false, items: action.payload };
      case GET_CART_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default cartReducer;