import api from "../api/axios";

// Fetch all workflow records
export const getRecords = async () => {
  const response = await api.get("/records");

  return response.data;
};

// Update a specific workflow record
export const updateRecord = async (id, updatedData) => {
  const response = await api.put(
    `/records/${id}`,

    updatedData,
  );

  return response.data;
};
