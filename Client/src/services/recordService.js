import api from "../api/axios";

export const getRecords = async () => {
  const response = await api.get("/records");

  return response.data;
};

export const updateRecord = async (id, updatedData) => {
  const response = await api.put(
    `/records/${id}`,

    updatedData,
  );

  return response.data;
};
