// ratingService.js
import axios from "axios";
import {api, API_BASE_URL} from "../api/api.js";
const BASE_URL = `${API_BASE_URL}/api/ratings`;

/**
 * Tạo mới đánh giá hỗ trợ upload ảnh
 * @param {Object} ratingData - Dữ liệu đánh giá
 * @param {File} imageFile - Tệp ảnh
 */
export const createRatingService = async (ratingData, imageFile) => {
  const formData = new FormData();
  formData.append('rating', JSON.stringify(ratingData));
  if (imageFile) {
    formData.append('image', imageFile);
  }
  return await api.post(`${BASE_URL}`, formData);
};

/**
 * Lấy tất cả các đánh giá
 */
export const getAllRatingsService = async () => {
  return await axios.get(`${BASE_URL}`);
};

/**
 * Lấy một đánh giá cụ thể theo ID
 * @param {string} id - ID của đánh giá
 */
export const getSpecificRatingByIdService = async (id) => {
  return await axios.get(`${BASE_URL}/${id}`);
};

/**
 * Lấy các đánh giá của một người dùng
 * @param {string} userId - ID của người dùng
 */
export const getRatingsByUserService = async (userId) => {
  return await api.get(`${BASE_URL}/user/${userId}`);
};

/**
 * Lấy tất cả các đánh giá của một sản phẩm
 * @param {string} productId - ID của sản phẩm
 */
export const getRatingsByProductService = async (productId) => {
  return await axios.get(`${BASE_URL}/product/${productId}`);
};

/**
 * Cập nhật đánh giá hỗ trợ upload ảnh
 * @param {string} id - ID của đánh giá
 * @param {Object} ratingData - Dữ liệu cập nhật đánh giá
 * @param {File} imageFile - Tệp ảnh
 */
export const updateRatingService = async (id, ratingData, imageFile) => {
  const formData = new FormData();
  formData.append('rating', JSON.stringify(ratingData));
  if (imageFile) {
    formData.append('image', imageFile);
  }
  return await api.put(`${BASE_URL}/${id}`, FormData);
};

/**
 * Xóa đánh giá
 * @param {string} id - ID của đánh giá
 */
export const deleteRatingService = async (id) => {
  return await api.delete(`${BASE_URL}/${id}`);
};