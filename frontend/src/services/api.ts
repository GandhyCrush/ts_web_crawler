import axios from 'axios';

// Define your base URL
const baseUrl = import.meta.env.VITE_API_URL; // You can change the default URL as needed

// Create an instance of Axios with the base URL

axios.defaults.baseURL = baseUrl;

// Export Axios methods for making API requests
export const { get, post, put, delete: del, patch, defaults } = axios;
