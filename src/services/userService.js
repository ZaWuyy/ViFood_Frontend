// userService.js
import axios from "axios";
import {api, API_BASE_URL} from "../api/api.js";
const BASE_URL = `${API_BASE_URL}/api/users`;

/**
 * Fetch user profile
 */
export const fetchProfileService = async () => {
  return await api.get(`${BASE_URL}/profile`);
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
  return await api.put(`${BASE_URL}/profile`, formData);
};

/**
 * Send verification email
 * @param {Object} emailData - Data for sending verification email
 */
export const sendVerificationEmailService = async (emailData) => {
  return await api.post(`${BASE_URL}/send-verification-email`, emailData);
};

/**
 * Verify email
 * @param {Object} verificationData - Data for email verification
 */
export const verifyEmailService = async (verificationData) => {
  return await api.post(`${BASE_URL}/verify-email`, verificationData);
};

/**
 * Create a new user (Admin)
 * @param {Object} userData - Data for the new user
 */
export const createUserService = async (userData) => {
  return await api.post(`${BASE_URL}/create`, userData);
};

/**
 * Update a user (Admin)
 * @param {string} id - User ID
 * @param {Object} userData - Updated user data
 */
export const updateUserService = async (id, userData) => {
  return await api.put(`${BASE_URL}/update/${id}`, userData);
};

/**
 * Delete a user (Admin)
 * @param {string} id - User ID
 */
export const deleteUserService = async (id) => {
  return await api.delete(`${BASE_URL}/delete/${id}`);
};

/**
 * Fetch a single user by ID
 * @param {string} id - User ID
 */
export const getUserService = async (id) => {
  return await api.get(`${BASE_URL}/${id}`);
};

/**
 * Fetch a list of users with search and filter
 * @param {Object} params - Query parameters for search and filter
 */
export const getUsersService = async (params) => {
  return await api.get(`${BASE_URL}`, params);
};

/**
 * Add a voucher to the user
 * @param {Object} voucherData - Data for the voucher to add
 */
export const addVoucherService = async (voucherData) => {
  return await api.post(`${BASE_URL}/vouchers/save`, voucherData);
};

/**
 * Remove a voucher from the user
 * @param {Object} voucherData - Data for the voucher to remove
 */
export const removeVoucherService = async (voucherData) => {
  return await api.post(`${BASE_URL}/vouchers/remove`, voucherData);
};

/**
 * Add a favorite product to the user
 * @param {Object} favoriteData - Data for the favorite product to add
 */
export const addFavoriteProductService = async (favoriteData) => {
  return await api.post(`${BASE_URL}/favorites/add`, favoriteData);
};

/**
 * Remove a favorite product from the user
 * @param {Object} favoriteData - Data for the favorite product to remove
 */
export const removeFavoriteProductService = async (favoriteData) => {
  return await api.post(`${BASE_URL}/favorites/remove`, favoriteData);
};