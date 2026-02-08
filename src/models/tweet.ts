import type { User } from "./user";

export interface Tweet {
    id: string;
    content: string;
    createdAt: string;
    user: User;
    likes: number;
    replies: Tweet[];
}