export interface LoginSuccess {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    username: string;
    imageUrl?: string;
    email?: string;
  };
}

export interface LoginError {
    erro: string;
}

export type LoginResponse = LoginSuccess | LoginError;