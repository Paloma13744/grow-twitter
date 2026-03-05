import apiService, { api } from "../config/api";
import type { ResponseDto } from "../dtos/response.dto";
import type { LoginSuccess } from "../models/login.interface";
import type { User } from "../models/user";

class UserService {
  async signup(data: {
    name: string;
    username: string;
    password: string;
    imageUrl?: string;
  }): Promise<ResponseDto> {
    try {
      const result = await api.post("/auth/register", data);
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async login(username: string, password: string): Promise<ResponseDto<LoginSuccess>> {
    try {
      const result = await api.post<LoginSuccess>("/auth/login", { username, password });
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError<LoginSuccess>(error);
    }
  }


  async getProfileByUsername(username: string): Promise<ResponseDto<User>> {
    try {
      const result = await api.get(`/users/${username}`);
      return { ok: true, data: result.data?.data ?? result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }


  async getUserByUsername(username: string): Promise<ResponseDto<User>> {
    return this.getProfileByUsername(username);
  }

  async followUser(userId: string): Promise<ResponseDto> {
    try {
      const result = await api.post(`/users/${userId}/follow`);
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async unfollowUser(userId: string): Promise<ResponseDto> {
    try {
      const result = await api.delete(`/users/${userId}/follow`);
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async listUsers(): Promise<ResponseDto<User[]>> {
    try {
      const result = await api.get("/users");
      return { ok: true, data: result.data?.data ?? result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }
}

export default new UserService();