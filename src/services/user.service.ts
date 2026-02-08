import type { ResponseDto } from "../dtos/response.dto";
import apiService, { api } from "../config/api";

class UserService {
  public async login(username: string, password: string): Promise<ResponseDto> {
    try {
      const result = await api.post("/user/auth", {
        username,
        password,
      });

      return {
        ...result.data,
        ok: true,
      };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }
}

export default new UserService();