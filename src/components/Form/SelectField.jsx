import React from 'react';
import './FormStyles.css';

const SelectField = ({ label, name, options, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">{label}</label>
      <select
        id={name}
        name={name}
        className="form-select"
        value={value}
        onChange={onChange}
      >
        <option value="">-- Select --</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
