// File: frontend/utils/validateForm.js

/**
 * Check if a field is not empty.
 * @param {string} value - The value of the input field.
 * @returns {string|null} - Error message if validation fails, otherwise null.
 */
export function validateRequiredField(value) {
    if (!value || value.trim() === '') {
        return 'This field is required.';
    }
    return null;
}

/**
 * Validate email format.
 * @param {string} email - The email value to validate.
 * @returns {string|null} - Error message if validation fails, otherwise null.
 */
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Invalid email address.';
    }
    return null;
}

/**
 * Validate phone number format (10-15 digits).
 * @param {string} phone - The phone number to validate.
 * @returns {string|null} - Error message if validation fails, otherwise null.
 */
export function validatePhoneNumber(phone) {
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
        return 'Invalid phone number.';
    }
    return null;
}

/**
 * Validate password complexity.
 * Password must be at least 8 characters long, contain at least one uppercase letter,
 * one lowercase letter, and one special character.
 * @param {string} password - The password to validate.
 * @returns {string|null} - Error message if validation fails, otherwise null.
 */
export function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        return `Password must be at least ${minLength} characters long.`;
    }
    if (!hasUpperCase) {
        return 'Password must contain at least one uppercase letter.';
    }
    if (!hasLowerCase) {
        return 'Password must contain at least one lowercase letter.';
    }
    if (!hasSpecialChar) {
        return 'Password must contain at least one special character.';
    }
    return null;
}

/**
 * Validate that password confirmation matches the password.
 * @param {string} password - The original password.
 * @param {string} confirmPassword - The confirmation password.
 * @returns {string|null} - Error message if validation fails, otherwise null.
 */
export function validatePasswordConfirm(password, confirmPassword) {
    if (password !== confirmPassword) {
        return 'Passwords do not match.';
    }
    return null;
}

/**
 * General form validation function.
 * @param {Object} formData - Form data as an object { fieldName: value }.
 * @param {Object} validationRules - Validation rules for each field { fieldName: [rules] }.
 * @returns {Object} - An object containing error messages for each field if validation fails.
 */
export function validateForm(formData, validationRules) {
    const errors = {};

    for (const field in validationRules) {
        const value = formData[field];
        const rules = validationRules[field];

        for (const rule of rules) {
            const error = rule(value, formData);
            if (error) {
                errors[field] = error;
                break; // Stop at the first error for this field.
            }
        }
    }

    return errors;
}
