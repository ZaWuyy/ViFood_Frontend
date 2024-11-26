import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
    ADD_CATEGORY_REQUEST,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILURE,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILURE,
  } from '../actionTypes/categoryActionType';
  
  const initialState = {
    categories: [],
    loading: false,
    error: null,
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CATEGORIES_REQUEST:
      case ADD_CATEGORY_REQUEST:
      case UPDATE_CATEGORY_REQUEST:
      case DELETE_CATEGORY_REQUEST:
        return { ...state, loading: true, error: null };
  
      case FETCH_CATEGORIES_SUCCESS:
        return { ...state, loading: false, categories: action.payload };
  
      case ADD_CATEGORY_SUCCESS:
        return { ...state, loading: false, categories: [...state.categories, action.payload] };
  
      case UPDATE_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          categories: state.categories.map((cat) =>
            cat._id === action.payload._id ? action.payload : cat
          ),
        };
  
      case DELETE_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          categories: state.categories.filter((cat) => cat._id !== action.payload),
        };
  
      case FETCH_CATEGORIES_FAILURE:
      case ADD_CATEGORY_FAILURE:
      case UPDATE_CATEGORY_FAILURE:
      case DELETE_CATEGORY_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  