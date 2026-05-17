import axios from "axios";

// Axios instance for backend API communication
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

export default api;
