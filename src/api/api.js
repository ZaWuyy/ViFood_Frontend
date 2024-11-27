import axios from "axios";

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"; // Using environment variable for base URL
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Handle response errors (e.g., unauthorized or token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle token expiration or invalid token here, e.g., redirect to login
      console.log("Unauthorized access - please login.");
    }
    return Promise.reject(error);
  }
);
