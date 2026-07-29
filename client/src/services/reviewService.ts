import axios from "axios";

const API_URL = "http://localhost:5050";

export const reviewCode = async (code: string) => {
  const response = await axios.post(`${API_URL}/review`, {
    code,
  });

  return response.data;
};