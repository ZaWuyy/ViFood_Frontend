// orderService.js
import apiClient from './apiClient.js';

const BASE_URL = '/api/orders';

/**
 * Create a new order
 * @param {Object} orderData - Data for the new order
 */
export const createOrderService = async (orderData) => {
  return await apiClient.post(`${BASE_URL}`, orderData, true);
};

/**
 * Get all orders (Admin)
 */
export const getAllOrdersService = async () => {
  return await apiClient.get(`${BASE_URL}`, {}, true);
};

/**
 * Get orders by user
 */
export const getUserOrdersService = async () => {
  return await apiClient.get(`${BASE_URL}/user`, {}, true);
};

/**
 * Get order by ID
 * @param {string} id - Order ID
 */
export const getOrderByIdService = async (id) => {
  return await apiClient.get(`${BASE_URL}/${id}`, {}, true);
};

/**
 * Update order status
 * @param {string} id - Order ID
 * @param {Object} statusData - Status update data
 */
export const updateOrderStatusService = async (id, statusData) => {
  return await apiClient.patch(`${BASE_URL}/${id}/status`, statusData, true);
};

/**
 * Delete an order
 * @param {string} id - Order ID
 */
export const deleteOrderService = async (id) => {
  return await apiClient.del(`${BASE_URL}/${id}`, true);
};