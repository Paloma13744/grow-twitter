import apiService, { api } from "../config/api";
import type { ResponseDto } from "../dtos/response.dto";
import type { Tweet } from "../models/tweet";

class TweetService {
  async getFeed(): Promise<ResponseDto<Tweet[]>> {
    try {
      const result = await api.get<{ success: boolean; data: Tweet[] }>("/tweets");
      return { ok: true, data: result.data.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async createTweet(content: string): Promise<ResponseDto<Tweet>> {
    try {
      const result = await api.post<Tweet>("/tweets", { content });
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async getTweetById(id: string): Promise<ResponseDto<any>> {
    try {
      const result = await api.get(`/tweets/${id}`);
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async deleteTweet(id: string): Promise<ResponseDto> {
    try {
      const result = await api.delete(`/tweets/${id}`);
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async likeTweet(tweetId: string): Promise<ResponseDto> {
    try {
      const result = await api.post(`/tweets/${tweetId}/like`);
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async unlikeTweet(tweetId: string): Promise<ResponseDto> {
    try {
      const result = await api.delete(`/tweets/${tweetId}/like`);
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async replyTweet(tweetId: string, content: string): Promise<ResponseDto> {
    try {
      const result = await api.post(`/tweets/${tweetId}/comments`, { content });
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }
  async getComments(tweetId: string): Promise<ResponseDto<any>> {
    try {
      const result = await api.get(`/tweets/${tweetId}/comments`);
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }
}



export default new TweetService();