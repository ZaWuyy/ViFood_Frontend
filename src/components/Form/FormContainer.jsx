import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import './FormStyles.css';

const FormContainer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
    // Gửi dữ liệu form đến API hoặc xử lý tại đây
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 className="form-title">Add New Product</h2>
      <InputField
        label="Product Name"
        name="name"
        placeholder="Enter product name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <SelectField
        label="Category"
        name="category"
        options={[
          { label: 'Electronics', value: 'electronics' },
          { label: 'Clothing', value: 'clothing' },
          { label: 'Furniture', value: 'furniture' },
        ]}
        value={formData.category}
        onChange={handleInputChange}
      />
      <button type="submit" className="form-button">
        Submit
      </button>
    </form>
  );
};

export default FormContainer;
