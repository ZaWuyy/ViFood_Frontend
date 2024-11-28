// api.js
import axios from "axios";

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

// Authenticated API instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.log("Unauthorized access - please login.");
        // Optionally, redirect to login
      } else {
        console.error(`API Error: ${error.response.status}`, error.response.data);
      }
    } else {
      console.error("API Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Public API instance (no authentication)
export const publicApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for public API
publicApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`Public API Error: ${error.response.status}`, error.response.data);
    } else {
      console.error("Public API Error:", error.message);
    }
    return Promise.reject(error);
  }
);