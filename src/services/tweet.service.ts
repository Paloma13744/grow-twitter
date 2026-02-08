import type { ResponseDto } from "../dtos/response.dto";
import apiService, { api } from "../config/api";

class TweetService {
  public async listTweets(idUser: string): Promise<ResponseDto> {
    try {
      const result = await api.get(`/user/${idUser}/tweet`);
      return {
        ...result.data,
        ok: true,
      };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  public async sendTweet(idUser: string, content: string): Promise<ResponseDto> {
    try {
      const result = await api.post(`/user/${idUser}/tweet`, { content });
      return {
        ...result.data,
        ok: true,
      };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }
}

export default new TweetService();