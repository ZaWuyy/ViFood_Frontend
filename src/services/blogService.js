// blogService.js
import axios from "axios";
import {api, API_BASE_URL} from "../api/api.js";

const BASE_URL = `${API_BASE_URL}/api/blogs`;

export const getBlogsService = async () => {
  return await axios.get(BASE_URL);
};

export const getBlogByIdService = async (id) => {
  return await axios.get(`${BASE_URL}/${id}`);
};

export const createBlogService = async (data) => {
  return await api.post(BASE_URL, data);
};

export const updateBlogService = async (id, data) => {
  return await api.put(`${BASE_URL}/${id}`, data);
};

export const deleteBlogService = async (id) => {
  return await api.delete(`${BASE_URL}/${id}`);
};