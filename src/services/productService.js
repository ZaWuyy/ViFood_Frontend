import { get, post } from './apiClient';

// Fetch the list of foods
export const fetchFoodListService = async () => {
  return await get('/api/food/list');
};

// Add a new food item
export const addFoodService = async (foodData) => {
  return await post('/api/food/add', foodData);
};

// Remove a food item
export const removeFoodService = async (foodId) => {
  return await post('/api/food/remove', { id: foodId });
};

// Update a food item
export const updateFoodService = async (foodData) => {
  return await post('/api/food/update', foodData);
};
