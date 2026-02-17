import apiService, { api } from "../config/api";
import type { ResponseDto } from "../dtos/response.dto";
import type { LoginSuccess } from "../models/login.interface";
import type { User } from "../models/user";

class UserService {
  async signup(
    data: { name: string; username: string; password: string; imageUrl?: string }
  ): Promise<ResponseDto> {
    try {
      const result = await api.post("/auth/register", data);
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async login(
    username: string,
    password: string
  ): Promise<ResponseDto<LoginSuccess>> {
    try {
      const result = await api.post<LoginSuccess>("/auth/login", {
        username,
        password,
      });

      return {
        ok: true,
        data: result.data,
      };
    } catch (error: any) {
      return apiService.handleError<LoginSuccess>(error);
    }
  }



  async listUsers(): Promise<ResponseDto<User[]>> {
    try {
      const result = await api.get<User[]>("/users");
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  // perfil de um usuário pelo id
  async getUserById(userId: string): Promise<ResponseDto<User>> {
    try {
      const result = await api.get<User>("/users", {
        params: { userId },
      });
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  // seguir usuário
  async followUser(userId: string): Promise<ResponseDto> {
    try {
      const result = await api.post("/followers", { userId });
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  // deixar de seguir usuário
  async unfollowUser(userId: string): Promise<ResponseDto> {
    try {
      const result = await api.delete("/followers", {
        data: { userId },
      });
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  // listar seguidores do usuário logado
  async listFollowers(): Promise<ResponseDto> {
    try {
      const result = await api.get("/followers");
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }
}

export default new UserService();