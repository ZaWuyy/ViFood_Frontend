// categoryReducer.js
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
} from '../actionTypes/categoryActionTypes.js';

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    // Lấy danh sách danh mục
    case FETCH_CATEGORIES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    case FETCH_CATEGORIES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Thêm mới danh mục
    case ADD_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_CATEGORY_SUCCESS:
      return { ...state, loading: false, categories: [...state.categories, action.payload] };
    case ADD_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Cập nhật danh mục
    case UPDATE_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
        ),
      };
    case UPDATE_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Xóa danh mục
    case DELETE_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: state.categories.filter((category) => category.id !== action.payload),
      };
    case DELETE_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default categoryReducer;