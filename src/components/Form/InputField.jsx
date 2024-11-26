import React from 'react';
import './FormStyles.css';

const InputField = ({ label, name, type = 'text', placeholder, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        className="form-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
