// uploadImageAction.js

import {
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILURE,
    UPLOAD_MULTIPLE_IMAGES_REQUEST,
    UPLOAD_MULTIPLE_IMAGES_SUCCESS,
    UPLOAD_MULTIPLE_IMAGES_FAILURE,
    GET_IMAGE_URL_REQUEST,
    GET_IMAGE_URL_SUCCESS,
    GET_IMAGE_URL_FAILURE,
    DELETE_IMAGE_REQUEST,
    DELETE_IMAGE_SUCCESS,
    DELETE_IMAGE_FAILURE,
    UPDATE_IMAGE_REQUEST,
    UPDATE_IMAGE_SUCCESS,
    UPDATE_IMAGE_FAILURE,
  } from '../actionTypes/uploadImageActionTypes.js';
  
  import {
    uploadImageService,
    uploadMultipleImagesService,
    getImageUrlService,
    deleteImageService,
    updateImageService,
  } from '../..services/uploadImageService.js';
  
  // Upload a single image
  export const uploadImage = (imageFile) => async (dispatch) => {
    dispatch({ type: UPLOAD_IMAGE_REQUEST });
    try {
      const data = await uploadImageService(imageFile);
      dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPLOAD_IMAGE_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Upload multiple images
  export const uploadMultipleImages = (imageFiles) => async (dispatch) => {
    dispatch({ type: UPLOAD_MULTIPLE_IMAGES_REQUEST });
    try {
      const data = await uploadMultipleImagesService(imageFiles);
      dispatch({ type: UPLOAD_MULTIPLE_IMAGES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPLOAD_MULTIPLE_IMAGES_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get image URL by publicId
  export const getImageUrl = (publicId) => async (dispatch) => {
    dispatch({ type: GET_IMAGE_URL_REQUEST });
    try {
      const data = await getImageUrlService(publicId);
      dispatch({ type: GET_IMAGE_URL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_IMAGE_URL_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Delete image by publicId
  export const deleteImage = (publicId) => async (dispatch) => {
    dispatch({ type: DELETE_IMAGE_REQUEST });
    try {
      await deleteImageService(publicId);
      dispatch({ type: DELETE_IMAGE_SUCCESS, payload: publicId });
    } catch (error) {
      dispatch({
        type: DELETE_IMAGE_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Update image
  export const updateImage = (imageFile) => async (dispatch) => {
    dispatch({ type: UPDATE_IMAGE_REQUEST });
    try {
      const data = await updateImageService(imageFile);
      dispatch({ type: UPDATE_IMAGE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_IMAGE_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };