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
 * Get all variants of a product
 * @param {string} productId - Product ID
 */
export const getProductVariantsService = async (productId) => {
  return await apiClient.get(`${BASE_URL}/${productId}/variants`, {}, true);
};

/**
 * Create a new product variant with image upload
 * @param {string} productId - Product ID
 * @param {Object} variantData - Data for the new variant
 * @param {File} imageFile - Image file for the variant
 */
export const createProductVariantService = async (productId, variantData, imageFile) => {
  const formData = new FormData();
  formData.append('variant', JSON.stringify(variantData));
  if (imageFile) {
    formData.append('image', imageFile);
  }
  return await apiClient.post(`${BASE_URL}/${productId}/variants`, formData, true);
};

/**
 * Update a product variant with image upload
 * @param {string} productId - Product ID
 * @param {string} variantId - Variant ID
 * @param {Object} variantData - Updated variant data
 * @param {File} imageFile - Image file for the variant
 */
export const updateProductVariantService = async (productId, variantId, variantData, imageFile) => {
  const formData = new FormData();
  formData.append('variant', JSON.stringify(variantData));
  if (imageFile) {
    formData.append('image', imageFile);
  }
  return await apiClient.put(`${BASE_URL}/${productId}/variants/${variantId}`, formData, true);
};

/**
 * Delete a product variant
 * @param {string} productId - Product ID
 * @param {string} variantId - Variant ID
 */
export const deleteProductVariantService = async (productId, variantId) => {
  return await apiClient.del(`${BASE_URL}/${productId}/variants/${variantId}`, true);
};