// commentAction.js

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
  
  import {
    createCommentService,
    updateCommentService,
    deleteCommentService,
    getCommentsByUserService,
    getCommentsByProductService,
    getAllCommentsService,
    getCommentByIdService,
  } from '../../services/commentService.js';
  
  // Create a New Comment with Optional Image Upload
  export const createComment = (commentData, imageFile = null) => async (dispatch) => {
    dispatch({ type: CREATE_COMMENT_REQUEST });
    try {
      const newComment = await createCommentService(commentData, imageFile);
      dispatch({ type: CREATE_COMMENT_SUCCESS, payload: newComment });
    } catch (error) {
      dispatch({
        type: CREATE_COMMENT_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Update an Existing Comment with Optional Image Upload
  export const updateComment = (id, commentData, imageFile = null) => async (dispatch) => {
    dispatch({ type: UPDATE_COMMENT_REQUEST });
    try {
      const updatedComment = await updateCommentService(id, commentData, imageFile);
      dispatch({ type: UPDATE_COMMENT_SUCCESS, payload: updatedComment });
    } catch (error) {
      dispatch({
        type: UPDATE_COMMENT_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Delete a Comment
  export const deleteComment = (id) => async (dispatch) => {
    dispatch({ type: DELETE_COMMENT_REQUEST });
    try {
      await deleteCommentService(id);
      dispatch({ type: DELETE_COMMENT_SUCCESS, payload: id });
    } catch (error) {
      dispatch({
        type: DELETE_COMMENT_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get All Comments by a Specific User
  export const getCommentsByUser = (userId) => async (dispatch) => {
    dispatch({ type: GET_COMMENTS_BY_USER_REQUEST });
    try {
      const comments = await getCommentsByUserService(userId);
      dispatch({ type: GET_COMMENTS_BY_USER_SUCCESS, payload: comments });
    } catch (error) {
      dispatch({
        type: GET_COMMENTS_BY_USER_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get All Comments for a Specific Product
  export const getCommentsByProduct = (productId) => async (dispatch) => {
    dispatch({ type: GET_COMMENTS_BY_PRODUCT_REQUEST });
    try {
      const comments = await getCommentsByProductService(productId);
      dispatch({ type: GET_COMMENTS_BY_PRODUCT_SUCCESS, payload: comments });
    } catch (error) {
      dispatch({
        type: GET_COMMENTS_BY_PRODUCT_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get All Comments
  export const getAllComments = () => async (dispatch) => {
    dispatch({ type: GET_ALL_COMMENTS_REQUEST });
    try {
      const comments = await getAllCommentsService();
      dispatch({ type: GET_ALL_COMMENTS_SUCCESS, payload: comments });
    } catch (error) {
      dispatch({
        type: GET_ALL_COMMENTS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get a Specific Comment by ID
  export const getCommentById = (id) => async (dispatch) => {
    dispatch({ type: GET_COMMENT_BY_ID_REQUEST });
    try {
      const comment = await getCommentByIdService(id);
      dispatch({ type: GET_COMMENT_BY_ID_SUCCESS, payload: comment });
    } catch (error) {
      dispatch({
        type: GET_COMMENT_BY_ID_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };