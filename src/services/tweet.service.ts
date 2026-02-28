import apiService, { api } from "../config/api";
import type { ResponseDto } from "../dtos/response.dto";
import type { Tweet } from "../models/tweet";

class TweetService {

  async getFeed(): Promise<ResponseDto<Tweet[]>> {
    try {
      const result = await api.get<Tweet[]>("/feed"); 
      return { ok: true, data: result.data };
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

  async getTweetById(id: string): Promise<ResponseDto<Tweet>> {
    try {
      const result = await api.get<Tweet>("/tweets", {
        params: { id },
      });
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async updateTweet(id: string, content: string): Promise<ResponseDto<Tweet>> {
    try {
      const result = await api.put<Tweet>("/tweets", { content }, {
        params: { id },
      });
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }


  async deleteTweet(id: string): Promise<ResponseDto> {
    try {
      const result = await api.delete("/tweets", {
        params: { id },
      });
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async getTweetsByUser(userId: string): Promise<ResponseDto<Tweet[]>> {
    try {
      const result = await api.get<Tweet[]>(`/users/${userId}/tweets`);
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async replyTweet(tweetId: string, content: string): Promise<ResponseDto> {
    try {
      const result = await api.post("/replies", {
        content,
        replyTo: tweetId,
      });
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async likeTweet(tweetId: string): Promise<ResponseDto> {
    try {
      const result = await api.post("/likes", { tweetId });
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }

  async unlikeTweet(tweetId: string): Promise<ResponseDto> {
    try {
      const result = await api.delete("/likes", {
        data: { tweetId },
      });
      return { ok: true, data: result.data };
    } catch (error: any) {
      return apiService.handleError(error);
    }
  }



}
export default new TweetService();