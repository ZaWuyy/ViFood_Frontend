// uploadImageService.js
import axios from "axios";
import {api, API_BASE_URL} from "../api/api.js";
const BASE_URL = `${API_BASE_URL}/api/uploads`;

/**
 * Upload một ảnh đơn
 * @param {File} imageFile - Tệp ảnh cần upload
 */
export const uploadImageService = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  return await axios.post(`${BASE_URL}/upload`, formData);
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
  return await axios.post(`${BASE_URL}/upload-multiple`, formData);
};

/**
 * Lấy URL ảnh theo publicId
 * @param {string} publicId - Public ID của ảnh
 */
export const getImageUrlService = async (publicId) => {
  return await axios.get(`${BASE_URL}/image/${publicId}`);
};

/**
 * Xóa ảnh theo publicId
 * @param {string} publicId - Public ID của ảnh
 */
export const deleteImageService = async (publicId) => {
  return await axios.delete(`${BASE_URL}/image/${publicId}`);
};

/**
 * Cập nhật ảnh
 * @param {File} imageFile - Tệp ảnh mới cần upload
 */
export const updateImageService = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  return await axios.put(`${BASE_URL}/image`, formData);
};