// voucherService.js
import apiClient from './apiClient.js';

const BASE_URL = '/api/vouchers';

/**
 * Fetch the list of vouchers
 * @param {Object} filters - Filters for fetching vouchers
 */
export const fetchVouchersService = async (filters = {}) => {
  return await apiClient.get(`${BASE_URL}`, filters, true);
};

/**
 * Fetch a voucher by its code
 * @param {string} code - Voucher code
 */
export const fetchVoucherByCodeService = async (code) => {
  return await  apiClient.get(`${BASE_URL}/${code}`, {}, true);
};

/**
 * Add a new voucher
 * @param {Object} voucher - Voucher data
 */
export const createVoucherService = async (voucher) => {
  return await apiClient.post(`${BASE_URL}`, voucher, true);
};

/**
 * Update a voucher by its code
 * @param {string} code - Voucher code
 * @param {Object} voucher - Updated voucher data
 */
export const updateVoucherService = async (code, voucher) => {
  return await apiClient.put(`${BASE_URL}/${code}`, voucher, true);
};

/**
 * Delete a voucher by its code
 * @param {string} code - Voucher code
 */
export const deleteVoucherService = async (code) => {
  return await apiClient.del(`${BASE_URL}/${code}`, true);
};

/**
 * Get vouchers by user
 * @param {string} userId - User ID
 */
export const getVouchersByUserService = async (userId) => {
  return await apiClient.get(`${BASE_URL}/user`, { userId }, true);
};