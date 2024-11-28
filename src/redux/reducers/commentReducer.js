// commentReducer.js
import {
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAILURE,
    UPDATE_COMMENT_REQUEST,
    UPDATE_COMMENT_SUCCESS,
    UPDATE_COMMENT_FAILURE,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
    GET_COMMENTS_BY_USER_REQUEST,
    GET_COMMENTS_BY_USER_SUCCESS,
    GET_COMMENTS_BY_USER_FAILURE,
    GET_COMMENTS_BY_PRODUCT_REQUEST,
    GET_COMMENTS_BY_PRODUCT_SUCCESS,
    GET_COMMENTS_BY_PRODUCT_FAILURE,
    GET_ALL_COMMENTS_REQUEST,
    GET_ALL_COMMENTS_SUCCESS,
    GET_ALL_COMMENTS_FAILURE,
    GET_COMMENT_BY_ID_REQUEST,
    GET_COMMENT_BY_ID_SUCCESS,
    GET_COMMENT_BY_ID_FAILURE,
  } from '../actionTypes/commentActionTypes.js';
  
  const initialState = {
    comments: [],
    currentComment: null,
    loading: false,
    error: null,
  };
  
  const commentReducer = (state = initialState, action) => {
    switch (action.type) {
      // Tạo mới bình luận
      case CREATE_COMMENT_REQUEST:
        return { ...state, loading: true, error: null };
      case CREATE_COMMENT_SUCCESS:
        return { ...state, loading: false, comments: [...state.comments, action.payload] };
      case CREATE_COMMENT_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Cập nhật bình luận
      case UPDATE_COMMENT_REQUEST:
        return { ...state, loading: true, error: null };
      case UPDATE_COMMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          comments: state.comments.map((comment) =>
            comment.id === action.payload.id ? action.payload : comment
          ),
          currentComment:
            state.currentComment && state.currentComment.id === action.payload.id
              ? action.payload
              : state.currentComment,
        };
      case UPDATE_COMMENT_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Xóa bình luận
      case DELETE_COMMENT_REQUEST:
        return { ...state, loading: true, error: null };
      case DELETE_COMMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          comments: state.comments.filter((comment) => comment.id !== action.payload),
          currentComment:
            state.currentComment && state.currentComment.id === action.payload
              ? null
              : state.currentComment,
        };
      case DELETE_COMMENT_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Lấy tất cả bình luận của người dùng
      case GET_COMMENTS_BY_USER_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_COMMENTS_BY_USER_SUCCESS:
        return { ...state, loading: false, comments: action.payload };
      case GET_COMMENTS_BY_USER_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Lấy tất cả bình luận của sản phẩm
      case GET_COMMENTS_BY_PRODUCT_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_COMMENTS_BY_PRODUCT_SUCCESS:
        return { ...state, loading: false, comments: action.payload };
      case GET_COMMENTS_BY_PRODUCT_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Lấy tất cả bình luận
      case GET_ALL_COMMENTS_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_ALL_COMMENTS_SUCCESS:
        return { ...state, loading: false, comments: action.payload };
      case GET_ALL_COMMENTS_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Lấy một bình luận cụ thể theo ID
      case GET_COMMENT_BY_ID_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_COMMENT_BY_ID_SUCCESS:
        return { ...state, loading: false, currentComment: action.payload };
      case GET_COMMENT_BY_ID_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default commentReducer;