import apiService, { api } from "../config/api";
import type { ResponseDto } from "../dtos/response.dto";

class UserService {

  async signup(data: any): Promise<ResponseDto> {
    try {
      const result = await api.post("/auth/register", data);
      return { ok: true, ...result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async login(username: string, password: string): Promise<ResponseDto> {
    try {
      const result = await api.post("/auth/login", { username, password });
      return { ok: true, ...result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async listAllUsers(): Promise<ResponseDto> {
    try {
      const result = await api.get("/users");
      return { ok: true, ...result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async getProfile(userId: string): Promise<ResponseDto> {
    try {
      const result = await api.get(`/user/${userId}`);
      return { ok: true, ...result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }
  async followUser(userId: string): Promise<ResponseDto> {
    try {
      const result = await api.post(`/users/${userId}/follow`);
      return { ok: true, ...result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async unfollowUser(userId: string): Promise<ResponseDto> {
    try {
      const result = await api.delete(`/users/${userId}/follow`);
      return { ok: true, ...result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

}

export default new UserService();