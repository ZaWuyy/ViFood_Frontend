// chatAction.js

import {
    GET_CHATS_REQUEST,
    GET_CHATS_SUCCESS,
    GET_CHATS_FAILURE,
    GET_OR_CREATE_CHAT_REQUEST,
    GET_OR_CREATE_CHAT_SUCCESS,
    GET_OR_CREATE_CHAT_FAILURE,
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILURE,
    DELETE_MESSAGE_IMAGE_REQUEST,
    DELETE_MESSAGE_IMAGE_SUCCESS,
    DELETE_MESSAGE_IMAGE_FAILURE,
  } from '../actionTypes/chatActionTypes.js';
  
  import {
    getChatsService,
    getOrCreateChatService,
    sendMessageService,
    deleteMessageImageService,
  } from '../../services/chatService.js';
  
  // Get All Chats
  export const getChats = () => async (dispatch) => {
    dispatch({ type: GET_CHATS_REQUEST });
    try {
      const data = await getChatsService();
      dispatch({ type: GET_CHATS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_CHATS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Get or Create Chat with a Specific User
  export const getOrCreateChat = (userId) => async (dispatch) => {
    dispatch({ type: GET_OR_CREATE_CHAT_REQUEST });
    try {
      const data = await getOrCreateChatService(userId);
      dispatch({ type: GET_OR_CREATE_CHAT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_OR_CREATE_CHAT_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Send a Message in a Chat
  export const sendMessage = (messageData) => async (dispatch) => {
    dispatch({ type: SEND_MESSAGE_REQUEST });
    try {
      const data = await sendMessageService(messageData);
      dispatch({ type: SEND_MESSAGE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SEND_MESSAGE_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  // Delete an Image from a Message
  export const deleteMessageImage = (imageId) => async (dispatch) => {
    dispatch({ type: DELETE_MESSAGE_IMAGE_REQUEST });
    try {
      await deleteMessageImageService(imageId);
      dispatch({ type: DELETE_MESSAGE_IMAGE_SUCCESS, payload: imageId });
    } catch (error) {
      dispatch({
        type: DELETE_MESSAGE_IMAGE_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };