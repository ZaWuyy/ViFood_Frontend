// orderService.js
import axios from "axios";
import {api, API_BASE_URL} from "../api/api.js";

const BASE_URL = `${API_BASE_URL}/api/orders`;

/**
 * Create a new order
 * @param {Object} orderData - Data for the new order
 */
export const createOrderService = async (orderData) => {
  return await api.post(`${BASE_URL}`, orderData);
};

/**
 * Get all orders (Admin)
 */
export const getAllOrdersService = async () => {
  return await api.get(`${BASE_URL}`);
};

/**
 * Get orders by user
 */
export const getUserOrdersService = async () => {
  return await api.get(`${BASE_URL}/user`);
};

/**
 * Get order by ID
 * @param {string} id - Order ID
 */
export const getOrderByIdService = async (id) => {
  return await api.get(`${BASE_URL}/${id}`);
};

/**
 * Update order status
 * @param {string} id - Order ID
 * @param {Object} statusData - Status update data
 */
export const updateOrderStatusService = async (id, statusData) => {
  return await api.patch(`${BASE_URL}/${id}/status`, statusData);
};

/**
 * Delete an order
 * @param {string} id - Order ID
 */
export const deleteOrderService = async (id) => {
  return await api.delete(`${BASE_URL}/${id}`);
};