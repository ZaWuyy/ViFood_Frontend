import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost/4000', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle GET requests
export const get = async (url, params = {}) => {
  try {
    const response = await apiClient.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('GET request error:', error);
    throw error;
  }
};

// Function to handle POST requests
export const post = async (url, data) => {
  try {
    const response = await apiClient.post(url, data);
    return response.data;
  } catch (error) {
    console.error('POST request error:', error);
    throw error;
  }
};

// Function to handle PUT requests
export const put = async (url, data) => {
  try {
    const response = await apiClient.put(url, data);
    return response.data;
  } catch (error) {
    console.error('PUT request error:', error);
    throw error;
  }
};

// Function to handle DELETE requests
export const del = async (url) => {
  try {
    const response = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    console.error('DELETE request error:', error);
    throw error;
  }
};

export default apiClient;