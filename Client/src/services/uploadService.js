import api from "../api/axios";

export const uploadDocument =
  async (formData) => {

    try {

      const response =
        await api.post(
          "/upload",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      return response.data;

    } catch (error) {

      console.log(error);
      throw error;

    }

};