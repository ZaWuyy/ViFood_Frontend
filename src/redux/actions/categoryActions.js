import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
    ADD_CATEGORY_REQUEST,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILURE,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILURE,
  } from '../actionTypes/categoryActionType';
  
  import {
    fetchCategoriesService,
    addCategoryService,
    updateCategoryService,
    deleteCategoryService,
  } from '../../services/categoryService';
  
  // Fetch all categories
  export const fetchCategories = () => async (dispatch) => {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });
    try {
      const categories = await fetchCategoriesService();
      dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: categories });
    } catch (error) {
      dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: error.message });
    }
  };
  
  // Add a new category
  export const addCategory = (category) => async (dispatch) => {
    dispatch({ type: ADD_CATEGORY_REQUEST });
    try {
      const newCategory = await addCategoryService(category);
      dispatch({ type: ADD_CATEGORY_SUCCESS, payload: newCategory });
    } catch (error) {
      dispatch({ type: ADD_CATEGORY_FAILURE, payload: error.message });
    }
  };
  
  // Update a category
  export const updateCategory = (id, category) => async (dispatch) => {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });
    try {
      const updatedCategory = await updateCategoryService(id, category);
      dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: updatedCategory });
    } catch (error) {
      dispatch({ type: UPDATE_CATEGORY_FAILURE, payload: error.message });
    }
  };
  
  // Delete a category
  export const deleteCategory = (id) => async (dispatch) => {
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    try {
      await deleteCategoryService(id);
      dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: id });
    } catch (error) {
      dispatch({ type: DELETE_CATEGORY_FAILURE, payload: error.message });
    }
  };
  