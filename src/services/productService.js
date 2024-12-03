// productService.js
import axios from "axios";
import {api, API_BASE_URL} from "../api/api.js";
const BASE_URL = `${API_BASE_URL}/api/products`;

/**
 * Get all products
 */
export const getProductsService = async () => {
  return await axios.get(`${BASE_URL}`);
};

/**
 * Get a product by ID
 * @param {string} id - Product ID
 */
export const getProductByIdService = async (id) => {
  return await axios.get(`${BASE_URL}/${id}`);
};

/**
 * Create a new product
 * @param {Object} productData - Data for the new product
 */
export const createProductService = async (productData) => {
  return await api.post(`${BASE_URL}`, productData);
};

/**
 * Update a product
 * @param {string} id - Product ID
 * @param {Object} productData - Updated product data
 */
export const updateProductService = async (id, productData) => {
  return await api.put(`${BASE_URL}/${id}`, productData);
};

/**
 * Delete a product
 * @param {string} id - Product ID
 */
export const deleteProductService = async (id) => {
  return await api.delete(`${BASE_URL}/${id}`);
};

/**
 * Get products by user
 */
export const getProductsByUserService = async () => {
  return await api.get(`${BASE_URL}/user`);
};