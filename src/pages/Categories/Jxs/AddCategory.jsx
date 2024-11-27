// AddCategory.js

import React, { useState } from 'react';
import axios from 'axios';
import '../Css/Modal.css';

const AddCategory = ({ url, fetchCategories }) => {
  const [formState, setFormState] = useState({
    name: '',
    active: false,
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
      await axios.post(`${url}/api/category/add`, formState);
      fetchCategories();
      setFormState({ name: '', active: false });
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Category</h3>
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
      <button type="submit" className="add-btn">Add Category</button>
    </form>
  );
};

export default AddCategory;
