import { get, post, put, del } from './apiClient';

// Fetch all categories
export const fetchCategoriesService = async () => {
  return await get('/api/category/list');
};

// Add a new category
export const addCategoryService = async (category) => {
  return await post('/api/category', category);
};

// Update a category
export const updateCategoryService = async (id, category) => {
  return await put(`/api/category/${id}`, category);
};

// Delete a category
export const deleteCategoryService = async (id) => {
  return await del(`/api/category/${id}`);
};
