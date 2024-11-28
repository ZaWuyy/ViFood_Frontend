// productService.js
import apiClient from './apiClient.js';

const BASE_URL = '/api/products';

/**
 * Get all products
 */
export const getProductsService = async () => {
  return await apiClient.get(`${BASE_URL}`, {}, false);
};

/**
 * Get a product by ID
 * @param {string} id - Product ID
 */
export const getProductByIdService = async (id) => {
  return await apiClient.get(`${BASE_URL}/${id}`, {}, false);
};

/**
 * Create a new product
 * @param {Object} productData - Data for the new product
 */
export const createProductService = async (productData) => {
  return await apiClient.post(`${BASE_URL}`, productData, true);
};

/**
 * Update a product
 * @param {string} id - Product ID
 * @param {Object} productData - Updated product data
 */
export const updateProductService = async (id, productData) => {
  return await apiClient.put(`${BASE_URL}/${id}`, productData, true);
};

/**
 * Delete a product
 * @param {string} id - Product ID
 */
export const deleteProductService = async (id) => {
  return await apiClient.del(`${BASE_URL}/${id}`, true);
};

/**
 * Get products by user
 */
export const getProductsByUserService = async () => {
  return await apiClient.get(`${BASE_URL}/user`, {}, true);
};