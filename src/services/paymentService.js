// paymentService.js
import apiClient from './apiClient.js';

const BASE_URL = '/api/payments';

/**
 * Yêu cầu thanh toán VNPay
 * @param {Object} paymentData - Dữ liệu thanh toán
 */
export const requestPaymentService = async (paymentData) => {
  return await apiClient.post(`${BASE_URL}/create-payment`, paymentData, true);
};

/**
 * Xử lý kết quả thanh toán từ VNPay
 */
export const paymentReturnService = async () => {
  return await apiClient.get(`${BASE_URL}/payment-return`, {}, true);
};

/**
 * Lấy lịch sử thanh toán của người dùng
 */
export const getPaymentHistoryService = async () => {
  return await apiClient.get(`${BASE_URL}/payment-history`, {}, true);
};