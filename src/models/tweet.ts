import type { User } from "./user";

export interface Tweet {
  id: string;
  content: string;
  createdAt: string;

  userId: string;
  user: User;

  isLikedByMe: boolean;
  likesCount: number;
  repliesCount: number;
}