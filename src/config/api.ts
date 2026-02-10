import axios from "axios";
import type { ResponseDto } from "../dtos/response.dto";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api-growtwitter-illk.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

class ApiService {
  public handleError(error: any): ResponseDto {
    const result: ResponseDto = {
      ok: false,
      message: "Erro desconhecido",
    };

    if (error.response?.data?.message) {
      result.message = error.response.data.message;
    } else if (error.message) {
      result.message = error.message;
    }

    return result;
  }
}

export default new ApiService();