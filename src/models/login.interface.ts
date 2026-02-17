export interface LoginSuccess {
    id: string;
    username: string;
    authToken: string;
}

export interface LoginError {
    erro: string;
}

export type LoginResponse = LoginSuccess | LoginError;