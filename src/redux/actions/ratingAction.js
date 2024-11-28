// ratingAction.js

import {
    CREATE_RATING_REQUEST,
    CREATE_RATING_SUCCESS,
    CREATE_RATING_FAILURE,
    GET_ALL_RATINGS_REQUEST,
    GET_ALL_RATINGS_SUCCESS,
    GET_ALL_RATINGS_FAILURE,
    GET_SPECIFIC_RATING_BY_ID_REQUEST,
    GET_SPECIFIC_RATING_BY_ID_SUCCESS,
    GET_SPECIFIC_RATING_BY_ID_FAILURE,
    GET_RATINGS_BY_USER_REQUEST,
    GET_RATINGS_BY_USER_SUCCESS,
    GET_RATINGS_BY_USER_FAILURE,
    GET_RATINGS_BY_PRODUCT_REQUEST,
    GET_RATINGS_BY_PRODUCT_SUCCESS,
    GET_RATINGS_BY_PRODUCT_FAILURE,
    UPDATE_RATING_REQUEST,
    UPDATE_RATING_SUCCESS,
    UPDATE_RATING_FAILURE,
    DELETE_RATING_REQUEST,
    DELETE_RATING_SUCCESS,
    DELETE_RATING_FAILURE,
  } from '../actionTypes/ratingActionTypes.js';
  
  import {
    createRatingService,
    getAllRatingsService,
    getSpecificRatingByIdService,
    getRatingsByUserService,
    getRatingsByProductService,
    updateRatingService,
    deleteRatingService,
  } from '../../services/ratingService.js';
  
  // Create a New Rating with Optional Image Upload
  export const createRating = (ratingData, imageFile = null) => async (dispatch) => {
    dispatch({ type: CREATE_RATING_REQUEST });
    try {
      const newRating = await createRatingService(ratingData, imageFile);
      dispatch({ type: CREATE_RATING_SUCCESS, payload: newRating });
    } catch (error) {
      dispatch({
        type: CREATE_RATING_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get All Ratings
  export const getAllRatings = () => async (dispatch) => {
    dispatch({ type: GET_ALL_RATINGS_REQUEST });
    try {
      const ratings = await getAllRatingsService();
      dispatch({ type: GET_ALL_RATINGS_SUCCESS, payload: ratings });
    } catch (error) {
      dispatch({
        type: GET_ALL_RATINGS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get a Specific Rating by ID
  export const getSpecificRatingById = (id) => async (dispatch) => {
    dispatch({ type: GET_SPECIFIC_RATING_BY_ID_REQUEST });
    try {
      const rating = await getSpecificRatingByIdService(id);
      dispatch({ type: GET_SPECIFIC_RATING_BY_ID_SUCCESS, payload: rating });
    } catch (error) {
      dispatch({
        type: GET_SPECIFIC_RATING_BY_ID_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get Ratings by User
  export const getRatingsByUser = (userId) => async (dispatch) => {
    dispatch({ type: GET_RATINGS_BY_USER_REQUEST });
    try {
      const ratings = await getRatingsByUserService(userId);
      dispatch({ type: GET_RATINGS_BY_USER_SUCCESS, payload: ratings });
    } catch (error) {
      dispatch({
        type: GET_RATINGS_BY_USER_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get Ratings by Product
  export const getRatingsByProduct = (productId) => async (dispatch) => {
    dispatch({ type: GET_RATINGS_BY_PRODUCT_REQUEST });
    try {
      const ratings = await getRatingsByProductService(productId);
      dispatch({ type: GET_RATINGS_BY_PRODUCT_SUCCESS, payload: ratings });
    } catch (error) {
      dispatch({
        type: GET_RATINGS_BY_PRODUCT_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Update an Existing Rating with Optional Image Upload
  export const updateRating = (id, ratingData, imageFile = null) => async (dispatch) => {
    dispatch({ type: UPDATE_RATING_REQUEST });
    try {
      const updatedRating = await updateRatingService(id, ratingData, imageFile);
      dispatch({ type: UPDATE_RATING_SUCCESS, payload: updatedRating });
    } catch (error) {
      dispatch({
        type: UPDATE_RATING_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Delete a Rating
  export const deleteRating = (id) => async (dispatch) => {
    dispatch({ type: DELETE_RATING_REQUEST });
    try {
      await deleteRatingService(id);
      dispatch({ type: DELETE_RATING_SUCCESS, payload: id });
    } catch (error) {
      dispatch({
        type: DELETE_RATING_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };