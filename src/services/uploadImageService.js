// uploadImageService.js
import apiClient from './apiClient.js';

const BASE_URL = '/api/uploads';

/**
 * Upload một ảnh đơn
 * @param {File} imageFile - Tệp ảnh cần upload
 */
export const uploadImageService = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  return await apiClient.post(`${BASE_URL}/upload`, formData, true);
};

/**
 * Upload nhiều ảnh
 * @param {File[]} imageFiles - Mảng các tệp ảnh cần upload
 */
export const uploadMultipleImagesService = async (imageFiles) => {
  const formData = new FormData();
  imageFiles.forEach((file) => {
    formData.append('images', file);
  });
  return await apiClient.post(`${BASE_URL}/upload-multiple`, formData, true);
};

/**
 * Lấy URL ảnh theo publicId
 * @param {string} publicId - Public ID của ảnh
 */
export const getImageUrlService = async (publicId) => {
  return await apiClient.get(`${BASE_URL}/image/${publicId}`, {}, true);
};

/**
 * Xóa ảnh theo publicId
 * @param {string} publicId - Public ID của ảnh
 */
export const deleteImageService = async (publicId) => {
  return await apiClient.del(`${BASE_URL}/image/${publicId}`, true);
};

/**
 * Cập nhật ảnh
 * @param {File} imageFile - Tệp ảnh mới cần upload
 */
export const updateImageService = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  return await apiClient.put(`${BASE_URL}/image`, formData, true);
};