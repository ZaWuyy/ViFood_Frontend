// EditCategory.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/Modal.css';

const EditCategory = ({ url, category, fetchCategories, setEditMode }) => {
  const [formState, setFormState] = useState({
    name: category.name,
    active: category.active,
  });

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${url}/api/category/update/${category._id}`, formState);
      fetchCategories();
      setEditMode(false);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  useEffect(() => {
    setFormState({
      name: category.name,
      active: category.active,
    });
  }, [category]);

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Category</h3>
      <input
        type="text"
        name="name"
        value={formState.name}
        onChange={handleChange}
        placeholder="Category Name"
        required
      />
      <label>
        Active:
        <input
          type="checkbox"
          name="active"
          checked={formState.active}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className="edit-btn">Update Category</button>
      <button type="button" onClick={() => setEditMode(false)} className="cancel-btn">
        Cancel
      </button>
    </form>
  );
};

export default EditCategory;
