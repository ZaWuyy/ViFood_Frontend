import { get, post, put, del } from './apiClient';

// Fetch the list of vouchers
export const fetchVouchersService = async (filters = {}) => {
  return await get('/api/voucher/list', filters);
};

// Fetch a voucher by its code
export const fetchVoucherByCodeService = async (code) => {
  return await get(`/api/voucher/${code}`);
};

// Add a new voucher
export const createVoucherService = async (voucher) => {
  return await post('/api/voucher/add', voucher);
};

// Update a voucher by its code
export const updateVoucherService = async (code, voucher) => {
  return await put(`/api/voucher/update/${code}`, voucher);
};

// Delete a voucher by its code
export const deleteVoucherService = async (code) => {
  return await del(`/api/voucher/${code}`);
};
