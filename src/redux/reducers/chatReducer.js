// chatReducer.js
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
  
  const initialState = {
    chats: [],
    loading: false,
    error: null,
  };
  
  const chatReducer = (state = initialState, action) => {
    switch (action.type) {
      // Lấy tất cả các cuộc trò chuyện
      case GET_CHATS_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_CHATS_SUCCESS:
        return { ...state, loading: false, chats: action.payload };
      case GET_CHATS_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Lấy hoặc tạo cuộc trò chuyện với một người dùng cụ thể
      case GET_OR_CREATE_CHAT_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_OR_CREATE_CHAT_SUCCESS:
        const existingChat = state.chats.find(chat => chat.id === action.payload.id);
        if (existingChat) {
          return {
            ...state,
            loading: false,
            chats: state.chats.map(chat =>
              chat.id === action.payload.id ? action.payload : chat
            ),
          };
        } else {
          return { ...state, loading: false, chats: [...state.chats, action.payload] };
        }
      case GET_OR_CREATE_CHAT_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Gửi tin nhắn trong cuộc trò chuyện
      case SEND_MESSAGE_REQUEST:
        return { ...state, loading: true, error: null };
      case SEND_MESSAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          chats: state.chats.map(chat =>
            chat.id === action.payload.chatId
              ? { ...chat, messages: [...chat.messages, action.payload.message] }
              : chat
          ),
        };
      case SEND_MESSAGE_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Xóa ảnh khỏi tin nhắn
      case DELETE_MESSAGE_IMAGE_REQUEST:
        return { ...state, loading: true, error: null };
      case DELETE_MESSAGE_IMAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          chats: state.chats.map(chat => ({
            ...chat,
            messages: chat.messages.map(message =>
              message.id === action.payload.messageId
                ? { ...message, images: message.images.filter(image => image.id !== action.payload.imageId) }
                : message
            ),
          })),
        };
      case DELETE_MESSAGE_IMAGE_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default chatReducer;