// productVariantAction.js

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
    DELETE_PRODUCT_VARIANT_FAILURE,
  } from '../actionTypes/productVariantActionTypes.js';
  
  import {
    getProductVariantsService,
    createProductVariantService,
    updateProductVariantService,
    deleteProductVariantService,
  } from '../../services/productVariantService.js';
  
  // Get All Product Variants
  export const getProductVariants = (productId) => async (dispatch) => {
    dispatch({ type: GET_PRODUCT_VARIANTS_REQUEST });
    try {
      const variants = await getProductVariantsService(productId);
      dispatch({ type: GET_PRODUCT_VARIANTS_SUCCESS, payload: variants });
    } catch (error) {
      dispatch({
        type: GET_PRODUCT_VARIANTS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Create a New Product Variant with Image Upload
  export const createProductVariant = (productId, variantData, imageFile) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_VARIANT_REQUEST });
    try {
      const newVariant = await createProductVariantService(productId, variantData, imageFile);
      dispatch({ type: CREATE_PRODUCT_VARIANT_SUCCESS, payload: newVariant });
    } catch (error) {
      dispatch({
        type: CREATE_PRODUCT_VARIANT_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Update an Existing Product Variant with Image Upload
  export const updateProductVariant = (productId, variantId, variantData, imageFile) => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_VARIANT_REQUEST });
    try {
      const updatedVariant = await updateProductVariantService(productId, variantId, variantData, imageFile);
      dispatch({ type: UPDATE_PRODUCT_VARIANT_SUCCESS, payload: updatedVariant });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_VARIANT_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Delete a Product Variant
  export const deleteProductVariant = (productId, variantId) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_VARIANT_REQUEST });
    try {
      await deleteProductVariantService(productId, variantId);
      dispatch({ type: DELETE_PRODUCT_VARIANT_SUCCESS, payload: variantId });
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_VARIANT_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };