import axios, {
  type InternalAxiosRequestConfig,
  type AxiosError,
} from "axios";
import type { ResponseDto } from "../dtos/response.dto";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://api-growtwitter-illk.onrender.com",
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("auth_token");

  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }

  return config;
});

class ApiService {
  public handleError<T = unknown>(error: any): ResponseDto<T> {
    console.error("API error:", error);

    const result: ResponseDto<T> = {
      ok: false,
      message: "Erro desconhecido",
    };

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;

      if (axiosError.response?.data?.message) {
        result.message = axiosError.response.data.message ?? result.message;
      } else if (axiosError.message) {
        result.message = axiosError.message;
      }
    } else if (error instanceof Error) {
      result.message = error.message;
    }

    return result;
  }
}

export default new ApiService();