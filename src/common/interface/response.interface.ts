export interface ResponseWithError {
  message: string;
  errors: unknown;
}

export interface ResponseWithData {
  message: string;
  data: unknown;
}

export interface IPaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPage: number;
}

export interface ApiResponse<T> {
  message: string;
  // meta?: IPaginationMeta | null;
  data?: T | null;
}
