// chatService.js
import axios from 'axios';
import {api, API_BASE_URL} from "../api/api.js";
const BASE_URL = `${API_BASE_URL}/api/chats`;

//Lấy tất cả các cuộc trò chuyện của người dùng hiện tại

export const getChatsService = async () => {
  return await api.get(`${BASE_URL}`);
};

// Lấy hoặc tạo cuộc trò chuyện với một người dùng cụ thể

export const getOrCreateChatService = async (userId) => {
  return await api.get(`${BASE_URL}/${userId}`);
};

// Gửi tin nhắn trong cuộc trò chuyện

export const sendMessageService = async (messageData) => {
  return await api.post(`${BASE_URL}/messages`, messageData);
};

// Xóa ảnh khỏi tin nhắn

export const deleteMessageImageService = async (imageId) => {
  return await api.delete(`${BASE_URL}/messages/image?id=${imageId}`);
};