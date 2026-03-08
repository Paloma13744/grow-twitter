import axios, {
  type InternalAxiosRequestConfig,
  type AxiosError,
} from "axios";
import type { ResponseDto } from "../dtos/response.dto";

export const api = axios.create({
  baseURL: "https://api-growtwitter-illk.onrender.com",
});

const STORAGE_KEY = "growtweet_auth";

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const raw = localStorage.getItem(STORAGE_KEY);
  const token = raw ? JSON.parse(raw)?.token : null;

  const isAuthRoute =
    config.url?.includes("/auth/login") ||
    config.url?.includes("/auth/register");

  if (token && !isAuthRoute) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

class ApiService {
  public handleError<T = unknown>(error: unknown): ResponseDto<T> {
    console.error("API error:", error);

    const result: ResponseDto<T> = {
      ok: false,
      message: "Erro desconhecido",
    };

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;

      if (axiosError.response?.data?.message) {
        result.message = axiosError.response.data.message;
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