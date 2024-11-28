// ratingReducer.js

import {
    CREATE_RATING_REQUEST,
    CREATE_RATING_SUCCESS,
    CREATE_RATING_FAILURE,
    GET_ALL_RATINGS_REQUEST,
    GET_ALL_RATINGS_SUCCESS,
    GET_ALL_RATINGS_FAILURE,
    GET_RATING_BY_ID_REQUEST,
    GET_RATING_BY_ID_SUCCESS,
    GET_RATING_BY_ID_FAILURE,
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
    DELETE_RATING_FAILURE
  } from '../actionTypes/ratingActionTypes.js';
  
  const initialState = {
    ratings: [],
    currentRating: null,
    loading: false,
    error: null
  };
  
  const ratingReducer = (state = initialState, action) => {
    switch (action.type) {
      // Create rating
      case CREATE_RATING_REQUEST:
        return { ...state, loading: true, error: null };
      case CREATE_RATING_SUCCESS:
        return { ...state, loading: false, ratings: [...state.ratings, action.payload] };
      case CREATE_RATING_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Get all ratings
      case GET_ALL_RATINGS_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_ALL_RATINGS_SUCCESS:
        return { ...state, loading: false, ratings: action.payload };
      case GET_ALL_RATINGS_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Get rating by ID
      case GET_RATING_BY_ID_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_RATING_BY_ID_SUCCESS:
        return { ...state, loading: false, currentRating: action.payload };
      case GET_RATING_BY_ID_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Get user ratings
      case GET_RATINGS_BY_USER_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_RATINGS_BY_USER_SUCCESS:
        return { ...state, loading: false, ratings: action.payload };
      case GET_RATINGS_BY_USER_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Get product ratings
      case GET_RATINGS_BY_PRODUCT_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_RATINGS_BY_PRODUCT_SUCCESS:
        return { ...state, loading: false, ratings: action.payload };
      case GET_RATINGS_BY_PRODUCT_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Update rating
      case UPDATE_RATING_REQUEST:
        return { ...state, loading: true, error: null };
      case UPDATE_RATING_SUCCESS:
        return {
          ...state,
          loading: false,
          ratings: state.ratings.map(rating =>
            rating.id === action.payload.id ? action.payload : rating
          ),
          currentRating: 
            state.currentRating?.id === action.payload.id 
              ? action.payload 
              : state.currentRating
        };
      case UPDATE_RATING_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Delete rating
      case DELETE_RATING_REQUEST:
        return { ...state, loading: true, error: null };
      case DELETE_RATING_SUCCESS:
        return {
          ...state,
          loading: false,
          ratings: state.ratings.filter(rating => rating.id !== action.payload),
          currentRating: 
            state.currentRating?.id === action.payload 
              ? null 
              : state.currentRating
        };
      case DELETE_RATING_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default ratingReducer;