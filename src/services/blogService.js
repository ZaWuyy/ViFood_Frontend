// blogService.js
import apiClient from './apiClient.js';

const BASE_URL = '/api/blogs';

export const getBlogsService = async () => {
  return await apiClient.get(BASE_URL, {}, false);
};

export const getBlogByIdService = async (id) => {
  return await apiClient.get(`${BASE_URL}/${id}`, {}, false);
};

export const createBlogService = async (data) => {
  return await apiClient.post(BASE_URL, data, true);
};

export const updateBlogService = async (id, data) => {
  return await apiClient.put(`${BASE_URL}/${id}`, data, true);
};

export const deleteBlogService = async (id) => {
  return await apiClient.del(`${BASE_URL}/${id}`, true);
};