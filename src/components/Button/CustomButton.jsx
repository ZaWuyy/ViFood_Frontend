import React from 'react';
import PropTypes from 'prop-types';
import './ButtonStyles.css';

const CustomButton = ({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  isLoading = false,
  icon,
}) => {
  return (
    <button
      className={`custom-button ${variant} ${size} ${disabled || isLoading ? 'disabled' : ''}`}
      onClick={!disabled && !isLoading ? onClick : null}
      type={type}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <span className="spinner"></span>
      ) : (
        <>
          {icon && <span className="button-icon">{icon}</span>}
          {label}
        </>
      )}
    </button>
  );
};

CustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  icon: PropTypes.node,
};

export default CustomButton;
