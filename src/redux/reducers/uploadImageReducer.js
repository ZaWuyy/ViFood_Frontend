// uploadImageReducer.js

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
    UPDATE_IMAGE_FAILURE
  } from '../actionTypes/uploadImageActionTypes.js';
  
  const initialState = {
    images: [],
    currentImage: null,
    loading: false,
    error: null
  };
  
  const uploadImageReducer = (state = initialState, action) => {
    switch (action.type) {
      // Upload single image
      case UPLOAD_IMAGE_REQUEST:
        return { ...state, loading: true, error: null };
      case UPLOAD_IMAGE_SUCCESS:
        return { 
          ...state, 
          loading: false, 
          images: [...state.images, action.payload],
          currentImage: action.payload 
        };
      case UPLOAD_IMAGE_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Upload multiple images
      case UPLOAD_MULTIPLE_IMAGES_REQUEST:
        return { ...state, loading: true, error: null };
      case UPLOAD_MULTIPLE_IMAGES_SUCCESS:
        return { 
          ...state, 
          loading: false, 
          images: [...state.images, ...action.payload]
        };
      case UPLOAD_MULTIPLE_IMAGES_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Get image URL
      case GET_IMAGE_URL_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_IMAGE_URL_SUCCESS:
        return { ...state, loading: false, currentImage: action.payload };
      case GET_IMAGE_URL_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Delete image
      case DELETE_IMAGE_REQUEST:
        return { ...state, loading: true, error: null };
      case DELETE_IMAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          images: state.images.filter(image => image.publicId !== action.payload),
          currentImage: 
            state.currentImage?.publicId === action.payload 
              ? null 
              : state.currentImage
        };
      case DELETE_IMAGE_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Update image
      case UPDATE_IMAGE_REQUEST:
        return { ...state, loading: true, error: null };
      case UPDATE_IMAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          images: state.images.map(image =>
            image.publicId === action.payload.publicId ? action.payload : image
          ),
          currentImage: 
            state.currentImage?.publicId === action.payload.publicId 
              ? action.payload 
              : state.currentImage
        };
      case UPDATE_IMAGE_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default uploadImageReducer;