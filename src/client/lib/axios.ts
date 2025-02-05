// utils/axiosInstance.client.ts
import axios from "axios";
import { BASE_URL } from "@/constants";

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the authentication token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage or context
    const token = localStorage.getItem("authToken"); // Replace with your token retrieval logic

    // If the token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response data directly
    return response.data;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("API Error - Response:", error.response.data);
      console.error("Status Code:", error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("API Error - Request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("API Error - Message:", error.message);
    }

    // Return a rejected promise with the error
    return Promise.reject(error);
  },
);
