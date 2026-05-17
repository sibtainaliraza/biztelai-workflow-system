import api from "../api/axios";

// Fetch dashboard analytics and statistics
export const getDashboardStats = async () => {
  const response = await api.get("/dashboard");

  return response.data;
};
