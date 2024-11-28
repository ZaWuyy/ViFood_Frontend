// categoryService.js
import apiClient from './apiClient.js';


const BASE_URL = '/api/categories';

// Lấy danh sách categories
export const fetchCategoriesService = async () => {
  return await apiClient.get(`${BASE_URL}/list`, {}, false);
};

// Tạo mới category với upload ảnh
export const addCategoryService = async (categoryData, imageFile) => {
  const formData = new FormData();
  formData.append('category', JSON.stringify(categoryData));
  formData.append('image', imageFile);
  return await apiClient.post(BASE_URL, formData, true);
};

// Cập nhật category với upload ảnh
export const updateCategoryService = async (id, categoryData, imageFile) => {
  const formData = new FormData();
  formData.append('category', JSON.stringify(categoryData));
  if (imageFile) {
    formData.append('image', imageFile);
  }
  return await apiClient.put(`${BASE_URL}/${id}`, formData, true);
};

// Xóa category
export const deleteCategoryService = async (id) => {
  return await del(`${BASE_URL}/${id}`, true);
};