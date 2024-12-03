// orderDetailService.js
import axios from "axios";
import {api, API_BASE_URL} from "../api/api.js";
const BASE_URL = `${API_BASE_URL}/api/order-details`;

/**
 * Tạo mới chi tiết đơn hàng
 * @param {Object} orderDetailData - Dữ liệu chi tiết đơn hàng
 */
export const createOrderDetailService = async (orderDetailData) => {
  return await api.post(`${BASE_URL}`, orderDetailData);
};

/**
 * Lấy tất cả chi tiết đơn hàng
 */
export const getAllOrderDetailsService = async () => {
  return await api.get(`${BASE_URL}`);
};

/**
 * Lấy chi tiết đơn hàng theo ID
 * @param {string} id - ID của chi tiết đơn hàng
 */
export const getOrderDetailByIdService = async (id) => {
  return await api.get(`${BASE_URL}/${id}`);
};

/**
 * Cập nhật chi tiết đơn hàng
 * @param {string} id - ID của chi tiết đơn hàng
 * @param {Object} orderDetailData - Dữ liệu cập nhật chi tiết đơn hàng
 */
export const updateOrderDetailService = async (id, orderDetailData) => {
  return await api.patch(`${BASE_URL}/${id}`, orderDetailData);
};

/**
 * Xóa chi tiết đơn hàng
 * @param {string} id - ID của chi tiết đơn hàng
 */
export const deleteOrderDetailService = async (id) => {
  return await api.delete(`${BASE_URL}/${id}`);
};