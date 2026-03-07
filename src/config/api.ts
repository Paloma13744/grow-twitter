import axios, { type InternalAxiosRequestConfig, type AxiosError } from "axios";
import type { ResponseDto } from "../dtos/response.dto";

export const api = axios.create({
  baseURL: "/api/proxy",
});

const STORAGE_KEY = "growtweet_auth";

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const raw = localStorage.getItem(STORAGE_KEY);
  const token = raw ? JSON.parse(raw)?.token : null;

  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }

  return config;
});

class ApiService {
  public handleError<T = unknown>(error: any): ResponseDto<T> {
    console.error("API error:", error);

    const result: ResponseDto<T> = { ok: false, message: "Erro desconhecido" };

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      result.message =
        axiosError.response?.data?.message || axiosError.message || result.message;
    } else if (error instanceof Error) {
      result.message = error.message;
    }

    return result;
  }
}

export default new ApiService();