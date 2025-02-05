import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "@/constants";

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the authentication token from cookies
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from cookies
    const token = Cookies.get("token"); // Use "token" instead of "authToken"

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
    return response.data; // Return only response data
  },
  (error) => {
    if (error.response) {
      console.error("API Error - Response:", error.response.data);
      console.error("Status Code:", error.response.status);
    } else if (error.request) {
      console.error("API Error - Request:", error.request);
    } else {
      console.error("API Error - Message:", error.message);
    }

    return Promise.reject(error);
  },
);
