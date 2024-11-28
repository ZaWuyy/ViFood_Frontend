// cartService.js
import apiClient from './apiClient.js';

const BASE_URL = '/api/carts';

// Add an item to the cart
export const addToCartService = async (item) => {
  return await apiClient.post(`${BASE_URL}/add`, item, true);
};

// Remove an item from the cart
export const removeFromCartService = async (itemId) => {
  return await apiClient.post(`${BASE_URL}/remove`, { id: itemId }, true);
};

// Get the user's cart
export const getCartService = async () => {
  return await apiClient.get(BASE_URL, {}, true);
};