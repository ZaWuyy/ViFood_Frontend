// commentService.js
import axios from "axios";
import {api, API_BASE_URL} from "../api/api.js";
const BASE_URL = `${API_BASE_URL}/api/comments`;

// Tạo mới bình luận hỗ trợ upload ảnh
 
export const createCommentService = async (commentData, imageFile) => {
  const formData = new FormData();
  formData.append('comment', JSON.stringify(commentData));
  if (imageFile) {
    formData.append('image', imageFile);
  }
  return await api.post(BASE_URL, formData);
};

// Cập nhật bình luận hỗ trợ upload ảnh

export const updateCommentService = async (id, commentData, imageFile) => {
  const formData = new FormData();
  formData.append('comment', JSON.stringify(commentData));
  if (imageFile) {
    formData.append('image', imageFile);
  }
  return await api.put(`${BASE_URL}/${id}`, formData);
};

// Xóa bình luận

export const deleteCommentService = async (id) => {
  return await api.delete(`${BASE_URL}/${id}`);
};

// Lấy tất cả bình luận của người dùng

export const getCommentsByUserService = async (userId) => {
  return await api.get(`${BASE_URL}/user/${userId}`);
};

// Lấy tất cả bình luận của sản phẩm

export const getCommentsByProductService = async (productId) => {
  return await axios.get(`${BASE_URL}/product/${productId}`);
};

// Lấy tất cả bình luận

export const getAllCommentsService = async () => {
  return await axios.get(BASE_URL);
};

// Lấy một bình luận cụ thể theo ID

export const getCommentByIdService = async (id) => {
  return await axios.get(`${BASE_URL}/${id}`);
};