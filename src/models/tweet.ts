import { User } from "./user";

export interface Tweet {
    id: string,
    user: User,
    content: string,
    createdAt: Date,
    likes: any[], // mude any( coloque algo melhor)
    replies: number

}