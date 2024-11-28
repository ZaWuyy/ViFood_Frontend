// productVariantReducer.js

import {
    GET_PRODUCT_VARIANTS_REQUEST,
    GET_PRODUCT_VARIANTS_SUCCESS,
    GET_PRODUCT_VARIANTS_FAILURE,
    CREATE_PRODUCT_VARIANT_REQUEST,
    CREATE_PRODUCT_VARIANT_SUCCESS,
    CREATE_PRODUCT_VARIANT_FAILURE,
    UPDATE_PRODUCT_VARIANT_REQUEST,
    UPDATE_PRODUCT_VARIANT_SUCCESS,
    UPDATE_PRODUCT_VARIANT_FAILURE,
    DELETE_PRODUCT_VARIANT_REQUEST,
    DELETE_PRODUCT_VARIANT_SUCCESS,
    DELETE_PRODUCT_VARIANT_FAILURE
  } from '../actionTypes/productVariantActionTypes.js';
  
  const initialState = {
    variants: [],
    loading: false,
    error: null
  };
  
  const productVariantReducer = (state = initialState, action) => {
    switch (action.type) {
      // Get all variants
      case GET_PRODUCT_VARIANTS_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_PRODUCT_VARIANTS_SUCCESS:
        return { ...state, loading: false, variants: action.payload };
      case GET_PRODUCT_VARIANTS_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Create variant
      case CREATE_PRODUCT_VARIANT_REQUEST:
        return { ...state, loading: true, error: null };
      case CREATE_PRODUCT_VARIANT_SUCCESS:
        return { 
          ...state, 
          loading: false, 
          variants: [...state.variants, action.payload]
        };
      case CREATE_PRODUCT_VARIANT_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Update variant
      case UPDATE_PRODUCT_VARIANT_REQUEST:
        return { ...state, loading: true, error: null };
      case UPDATE_PRODUCT_VARIANT_SUCCESS:
        return {
          ...state,
          loading: false,
          variants: state.variants.map(variant =>
            variant.id === action.payload.id ? action.payload : variant
          )
        };
      case UPDATE_PRODUCT_VARIANT_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Delete variant
      case DELETE_PRODUCT_VARIANT_REQUEST:
        return { ...state, loading: true, error: null };
      case DELETE_PRODUCT_VARIANT_SUCCESS:
        return {
          ...state,
          loading: false,
          variants: state.variants.filter(variant => variant.id !== action.payload)
        };
      case DELETE_PRODUCT_VARIANT_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default productVariantReducer;