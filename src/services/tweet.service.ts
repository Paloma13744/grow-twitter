import apiService, { api } from "../config/api";
import type { ResponseDto } from "../dtos/response.dto";

class TweetService {
  async getFeed(): Promise<ResponseDto> {
    try {
      const result = await api.get("/tweets/feed");
      return { ok: true, ...result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async createTweet(content: string): Promise<ResponseDto> {
    try {
      const result = await api.post("/tweets", { content });
      return { ok: true, ...result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async listUserTweets(userId: string): Promise<ResponseDto> {
    try {
      const result = await api.get(`/tweets/user/${userId}`);
      return { ok: true, ...result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }


  async updateTweet(id: string, content: string): Promise<ResponseDto> {
    try {
      const result = await api.put(`/tweets/${id}`, { content });
      return { ok: true, ...result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async deleteTweet(id: string): Promise<ResponseDto> {
    try {
      const result = await api.delete(`/tweets/${id}`);
      return { ok: true, ...result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }
  async getTweetById(id: string): Promise<ResponseDto> {
    try {
      const result = await api.get(`/tweets/${id}`);
      return { ok: true, ...result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async getTweetComments(tweetId: string): Promise<ResponseDto> {
    try {
      const result = await api.get(`/tweets/${tweetId}/comments`);
      return { ok: true, ...result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

}

export default new TweetService();