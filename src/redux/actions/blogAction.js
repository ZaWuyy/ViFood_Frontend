// blogAction.js

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
  
  import {
    getBlogs as getBlogsService,
    getBlogById as getBlogByIdService,
    createBlog as createBlogService,
    updateBlog as updateBlogService,
    deleteBlog as deleteBlogService,
  } from '../../services/blogService.js';
  
  // Get All Blogs
  export const getBlogs = () => async (dispatch) => {
    dispatch({ type: GET_BLOGS_REQUEST });
    try {
      const data = await getBlogsService();
      dispatch({ type: GET_BLOGS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_BLOGS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get Blog by ID
  export const getBlogById = (id) => async (dispatch) => {
    dispatch({ type: GET_BLOG_BY_ID_REQUEST });
    try {
      const data = await getBlogByIdService(id);
      dispatch({ type: GET_BLOG_BY_ID_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_BLOG_BY_ID_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Create a New Blog
  export const createBlog = (blogData) => async (dispatch) => {
    dispatch({ type: CREATE_BLOG_REQUEST });
    try {
      const data = await createBlogService(blogData);
      dispatch({ type: CREATE_BLOG_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_BLOG_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Update an Existing Blog
  export const updateBlog = (id, updatedData) => async (dispatch) => {
    dispatch({ type: UPDATE_BLOG_REQUEST });
    try {
      const data = await updateBlogService(id, updatedData);
      dispatch({ type: UPDATE_BLOG_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_BLOG_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Delete a Blog
  export const deleteBlog = (id) => async (dispatch) => {
    dispatch({ type: DELETE_BLOG_REQUEST });
    try {
      await deleteBlogService(id);
      dispatch({ type: DELETE_BLOG_SUCCESS, payload: id });
    } catch (error) {
      dispatch({
        type: DELETE_BLOG_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };