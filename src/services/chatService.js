// chatService.js
import apiClient from './apiClient.js';

const BASE_URL = '/api/chats';

//Lấy tất cả các cuộc trò chuyện của người dùng hiện tại

export const getChatsService = async () => {
  return await apiClient.get(`${BASE_URL}`, {}, true);
};

// Lấy hoặc tạo cuộc trò chuyện với một người dùng cụ thể

export const getOrCreateChatService = async (userId) => {
  return await apiClient.get(`${BASE_URL}/${userId}`, {}, true);
};

// Gửi tin nhắn trong cuộc trò chuyện

export const sendMessageService = async (messageData) => {
  return await apiClient.post(`${BASE_URL}/messages`, messageData, true);
};

// Xóa ảnh khỏi tin nhắn

export const deleteMessageImageService = async (imageId) => {
  return await apiClient.del(`${BASE_URL}/messages/image?id=${imageId}`, true);
};