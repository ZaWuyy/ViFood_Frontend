// cartService.js
import axios from "axios";
import {api, API_BASE_URL} from "../api/api.js";

const BASE_URL = `${API_BASE_URL}/api/carts`;

// Add an item to the cart
export const addToCartService = async (item) => {
  return await api.post(`${BASE_URL}/add`, item);
};

// Remove an item from the cart
export const removeFromCartService = async (itemId) => {
  return await api.post(`${BASE_URL}/remove`, { id: itemId });
};

// Get the user's cart
export const getCartService = async () => {
  return await api.get(BASE_URL);
};