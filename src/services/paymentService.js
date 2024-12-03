// paymentService.js
import axios from "axios";
import {api, API_BASE_URL} from "../api/api.js";
const BASE_URL = `${API_BASE_URL}/api/payments`;

/**
 * Yêu cầu thanh toán VNPay
 * @param {Object} paymentData - Dữ liệu thanh toán
 */
export const requestPaymentService = async (paymentData) => {
  return await api.post(`${BASE_URL}/create-payment`, paymentData);
};

/**
 * Xử lý kết quả thanh toán từ VNPay
 */
export const paymentReturnService = async () => {
  return await api.get(`${BASE_URL}/payment-return`);
};

/**
 * Lấy lịch sử thanh toán của người dùng
 */
export const getPaymentHistoryService = async () => {
  return await api.get(`${BASE_URL}/payment-history`);
};