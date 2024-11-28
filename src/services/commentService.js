// commentService.js
import apiClient from './apiClient.js';

const BASE_URL = '/api/comments';

// Tạo mới bình luận hỗ trợ upload ảnh
 
export const createCommentService = async (commentData, imageFile) => {
  const formData = new FormData();
  formData.append('comment', JSON.stringify(commentData));
  if (imageFile) {
    formData.append('image', imageFile);
  }
  return await apiClient.post(BASE_URL, formData, true);
};

// Cập nhật bình luận hỗ trợ upload ảnh

export const updateCommentService = async (id, commentData, imageFile) => {
  const formData = new FormData();
  formData.append('comment', JSON.stringify(commentData));
  if (imageFile) {
    formData.append('image', imageFile);
  }
  return await apiClient.put(`${BASE_URL}/${id}`, formData, true);
};

// Xóa bình luận

export const deleteCommentService = async (id) => {
  return await apiClient.del(`${BASE_URL}/${id}`, true);
};

// Lấy tất cả bình luận của người dùng

export const getCommentsByUserService = async (userId) => {
  return await apiClient.get(`${BASE_URL}/user/${userId}`, {}, true);
};

// Lấy tất cả bình luận của sản phẩm

export const getCommentsByProductService = async (productId) => {
  return await apiClient.get(`${BASE_URL}/product/${productId}`, {}, false);
};

// Lấy tất cả bình luận

export const getAllCommentsService = async () => {
  return await apiClient.get(BASE_URL, {}, false);
};

// Lấy một bình luận cụ thể theo ID

export const getCommentByIdService = async (id) => {
  return await apiClient.get(`${BASE_URL}/${id}`, {}, false);
};