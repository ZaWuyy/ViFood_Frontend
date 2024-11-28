// ratingService.js
import apiClient from './apiClient.js';

const BASE_URL = '/api/ratings';

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
  return await apiClient.post(`${BASE_URL}`, formData, true);
};

/**
 * Lấy tất cả các đánh giá
 */
export const getAllRatingsService = async () => {
  return await apiClient.get(`${BASE_URL}`, {}, false);
};

/**
 * Lấy một đánh giá cụ thể theo ID
 * @param {string} id - ID của đánh giá
 */
export const getSpecificRatingByIdService = async (id) => {
  return await apiClient.get(`${BASE_URL}/${id}`, {}, false);
};

/**
 * Lấy các đánh giá của một người dùng
 * @param {string} userId - ID của người dùng
 */
export const getRatingsByUserService = async (userId) => {
  return await apiClient.get(`${BASE_URL}/user/${userId}`, {}, true);
};

/**
 * Lấy tất cả các đánh giá của một sản phẩm
 * @param {string} productId - ID của sản phẩm
 */
export const getRatingsByProductService = async (productId) => {
  return await apiClient.get(`${BASE_URL}/product/${productId}`, {}, false);
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
  return await apiClient.put(`${BASE_URL}/${id}`, formData, true);
};

/**
 * Xóa đánh giá
 * @param {string} id - ID của đánh giá
 */
export const deleteRatingService = async (id) => {
  return await apiClient.del(`${BASE_URL}/${id}`, true);
};