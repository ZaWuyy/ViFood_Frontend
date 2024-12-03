// categoryService.js
import axios from 'axios';
import {api, API_BASE_URL} from "../api/api.js";
const BASE_URL = `${API_BASE_URL}/api/categories`;

// Lấy danh sách categories
export const fetchCategoriesService = async () => {
  return await axios.get(`${BASE_URL}`);
};

// Tạo mới category với upload ảnh
export const addCategoryService = async (categoryData, imageFile) => {
  const formData = new FormData();
  formData.append('category', JSON.stringify(categoryData));
  formData.append('image', imageFile);
  return await api.post(BASE_URL, formData);
};

// Cập nhật category với upload ảnh
export const updateCategoryService = async (id, categoryData, imageFile) => {
  const formData = new FormData();
  formData.append('category', JSON.stringify(categoryData));
  if (imageFile) {
    formData.append('image', imageFile);
  }
  return await api.put(`${BASE_URL}/${id}`, formData);
};

// Xóa category
export const deleteCategoryService = async (id) => {
  return await api.delete(`${BASE_URL}/${id}`);
};