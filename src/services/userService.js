// userService.js
import apiClient from './apiClient.js';

const BASE_URL = '/api/users';

/**
 * Fetch user profile
 */
export const fetchProfileService = async () => {
  return await apiClient.get(`${BASE_URL}/profile`, {}, true);
};

/**
 * Update user profile with avatar upload
 * @param {Object} profileData - Data for the user profile
 * @param {File} avatarFile - Avatar image file
 */
export const updateProfileService = async (profileData, avatarFile) => {
  const formData = new FormData();
  formData.append('profile', JSON.stringify(profileData));
  if (avatarFile) {
    formData.append('avatar', avatarFile);
  }
  return await apiClient.put(`${BASE_URL}/profile`, formData, true);
};

/**
 * Send verification email
 * @param {Object} emailData - Data for sending verification email
 */
export const sendVerificationEmailService = async (emailData) => {
  return await apiClient.post(`${BASE_URL}/send-verification-email`, emailData, true);
};

/**
 * Verify email
 * @param {Object} verificationData - Data for email verification
 */
export const verifyEmailService = async (verificationData) => {
  return await apiClient.post(`${BASE_URL}/verify-email`, verificationData, true);
};

/**
 * Create a new user (Admin)
 * @param {Object} userData - Data for the new user
 */
export const createUserService = async (userData) => {
  return await apiClient.post(`${BASE_URL}/create`, userData, true);
};

/**
 * Update a user (Admin)
 * @param {string} id - User ID
 * @param {Object} userData - Updated user data
 */
export const updateUserService = async (id, userData) => {
  return await apiClient.put(`${BASE_URL}/update/${id}`, userData, true);
};

/**
 * Delete a user (Admin)
 * @param {string} id - User ID
 */
export const deleteUserService = async (id) => {
  return await apiClient.del(`${BASE_URL}/delete/${id}`, true);
};

/**
 * Fetch a single user by ID
 * @param {string} id - User ID
 */
export const getUserService = async (id) => {
  return await apiClient.get(`${BASE_URL}/${id}`, {}, true);
};

/**
 * Fetch a list of users with search and filter
 * @param {Object} params - Query parameters for search and filter
 */
export const getUsersService = async (params) => {
  return await apiClient.get(`${BASE_URL}`, params, true);
};

/**
 * Add a voucher to the user
 * @param {Object} voucherData - Data for the voucher to add
 */
export const addVoucherService = async (voucherData) => {
  return await apiClient.post(`${BASE_URL}/vouchers/save`, voucherData, true);
};

/**
 * Remove a voucher from the user
 * @param {Object} voucherData - Data for the voucher to remove
 */
export const removeVoucherService = async (voucherData) => {
  return await apiClient.post(`${BASE_URL}/vouchers/remove`, voucherData, true);
};

/**
 * Add a favorite product to the user
 * @param {Object} favoriteData - Data for the favorite product to add
 */
export const addFavoriteProductService = async (favoriteData) => {
  return await apiClient.post(`${BASE_URL}/favorites/add`, favoriteData, true);
};

/**
 * Remove a favorite product from the user
 * @param {Object} favoriteData - Data for the favorite product to remove
 */
export const removeFavoriteProductService = async (favoriteData) => {
  return await apiClient.post(`${BASE_URL}/favorites/remove`, favoriteData, true);
};