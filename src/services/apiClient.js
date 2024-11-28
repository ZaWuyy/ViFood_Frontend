// apiClient.js
import { api, publicApi } from '../api/api.js';

// Function to handle GET requests
export const get = async (url, params = {}, requireAuth = true) => {
  try {
    const instance = requireAuth ? api : publicApi;
    const response = await instance.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('GET request error:', error);
    throw error;
  }
};

// Function to handle POST requests
export const post = async (url, data, requireAuth = true) => {
  try {
    const instance = requireAuth ? api : publicApi;
    const response = await instance.post(url, data);
    return response.data;
  } catch (error) {
    console.error('POST request error:', error);
    throw error;
  }
};

// Function to handle PUT requests
export const put = async (url, data, requireAuth = true) => {
  try {
    const instance = requireAuth ? api : publicApi;
    const response = await instance.put(url, data);
    return response.data;
  } catch (error) {
    console.error('PUT request error:', error);
    throw error;
  }
};

// Function to handle PATCH requests
export const patch = async (url, data, requireAuth = true) => {
  try {
    const instance = requireAuth ? api : publicApi;
    const response = await instance.patch(url, data);
    return response.data;
  } catch (error) {
    console.error('PATCH request error:', error);
    throw error;
  }
};

// Function to handle DELETE requests
export const del = async (url, requireAuth = true) => {
  try {
    const instance = requireAuth ? api : publicApi;
    const response = await instance.delete(url);
    return response.data;
  } catch (error) {
    console.error('DELETE request error:', error);
    throw error;
  }
};

export default { get, post, put, patch, del };