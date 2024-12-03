// voucherService.js
import axios from "axios";
import {api, API_BASE_URL} from "../api/api.js";
const BASE_URL =  `${API_BASE_URL}/api/vouchers`;

/**
 * Fetch the list of vouchers
 * @param {Object} filters - Filters for fetching vouchers
 */
export const fetchVouchersService = async (filters = {}) => {
  return await api.get(`${BASE_URL}`, filters);
};

/**
 * Fetch a voucher by its code
 * @param {string} code - Voucher code
 */
export const fetchVoucherByCodeService = async (code) => {
  return await  api.get(`${BASE_URL}/${code}`, {});
};

/**
 * Add a new voucher
 * @param {Object} voucher - Voucher data
 */
export const createVoucherService = async (voucher) => {
  return await api.post(`${BASE_URL}`, voucher);
};

/**
 * Update a voucher by its code
 * @param {string} code - Voucher code
 * @param {Object} voucher - Updated voucher data
 */
export const updateVoucherService = async (code, voucher) => {
  return await api.put(`${BASE_URL}/${code}`, voucher);
};

/**
 * Delete a voucher by its code
 * @param {string} code - Voucher code
 */
export const deleteVoucherService = async (code) => {
  return await api.delete(`${BASE_URL}/${code}`);
};

/**
 * Get vouchers by user
 * @param {string} userId - User ID
 */
export const getVouchersByUserService = async (userId) => {
  return await api.get(`${BASE_URL}/user`, { userId });
};  