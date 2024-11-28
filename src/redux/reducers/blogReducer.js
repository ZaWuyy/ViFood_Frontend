// blogReducer.js
import {
    GET_BLOGS_REQUEST,
    GET_BLOGS_SUCCESS,
    GET_BLOGS_FAILURE,
    GET_BLOG_BY_ID_REQUEST,
    GET_BLOG_BY_ID_SUCCESS,
    GET_BLOG_BY_ID_FAILURE,
    CREATE_BLOG_REQUEST,
    CREATE_BLOG_SUCCESS,
    CREATE_BLOG_FAILURE,
    UPDATE_BLOG_REQUEST,
    UPDATE_BLOG_SUCCESS,
    UPDATE_BLOG_FAILURE,
    DELETE_BLOG_REQUEST,
    DELETE_BLOG_SUCCESS,
    DELETE_BLOG_FAILURE,
  } from '../actionTypes/blogActionTypes.js';
  
  const initialState = {
    blogs: [],
    blog: null,
    loading: false,
    error: null,
  };
  
  const blogReducer = (state = initialState, action) => {
    switch (action.type) {
      // Lấy danh sách bài viết
      case GET_BLOGS_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_BLOGS_SUCCESS:
        return { ...state, loading: false, blogs: action.payload };
      case GET_BLOGS_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Lấy bài viết theo ID
      case GET_BLOG_BY_ID_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_BLOG_BY_ID_SUCCESS:
        return { ...state, loading: false, blog: action.payload };
      case GET_BLOG_BY_ID_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Tạo mới bài viết
      case CREATE_BLOG_REQUEST:
        return { ...state, loading: true, error: null };
      case CREATE_BLOG_SUCCESS:
        return { ...state, loading: false, blogs: [...state.blogs, action.payload] };
      case CREATE_BLOG_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Cập nhật bài viết
      case UPDATE_BLOG_REQUEST:
        return { ...state, loading: true, error: null };
      case UPDATE_BLOG_SUCCESS:
        return {
          ...state,
          loading: false,
          blogs: state.blogs.map((blog) =>
            blog.id === action.payload.id ? action.payload : blog
          ),
          blog: state.blog && state.blog.id === action.payload.id ? action.payload : state.blog,
        };
      case UPDATE_BLOG_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Xóa bài viết
      case DELETE_BLOG_REQUEST:
        return { ...state, loading: true, error: null };
      case DELETE_BLOG_SUCCESS:
        return {
          ...state,
          loading: false,
          blogs: state.blogs.filter((blog) => blog.id !== action.payload),
          blog: state.blog && state.blog.id === action.payload ? null : state.blog,
        };
      case DELETE_BLOG_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default blogReducer;