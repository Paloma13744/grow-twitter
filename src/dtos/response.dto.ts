
export interface ResponseDto<T = unknown> {
    ok: boolean;
    message?: string;
    data?: T;
    [key: string]: unknown;
  }