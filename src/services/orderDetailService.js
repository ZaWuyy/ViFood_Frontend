// orderDetailService.js
import apiClient from './apiClient.js';

const BASE_URL = '/api/order-details';

/**
 * Tạo mới chi tiết đơn hàng
 * @param {Object} orderDetailData - Dữ liệu chi tiết đơn hàng
 */
export const createOrderDetailService = async (orderDetailData) => {
  return await apiClient.post(`${BASE_URL}`, orderDetailData, true);
};

/**
 * Lấy tất cả chi tiết đơn hàng
 */
export const getAllOrderDetailsService = async () => {
  return await apiClient.get(`${BASE_URL}`, {}, true);
};

/**
 * Lấy chi tiết đơn hàng theo ID
 * @param {string} id - ID của chi tiết đơn hàng
 */
export const getOrderDetailByIdService = async (id) => {
  return await apiClient.get(`${BASE_URL}/${id}`, {}, true);
};

/**
 * Cập nhật chi tiết đơn hàng
 * @param {string} id - ID của chi tiết đơn hàng
 * @param {Object} orderDetailData - Dữ liệu cập nhật chi tiết đơn hàng
 */
export const updateOrderDetailService = async (id, orderDetailData) => {
  return await apiClient.patch(`${BASE_URL}/${id}`, orderDetailData, true);
};

/**
 * Xóa chi tiết đơn hàng
 * @param {string} id - ID của chi tiết đơn hàng
 */
export const deleteOrderDetailService = async (id) => {
  return await apiClient.del(`${BASE_URL}/${id}`, true);
};