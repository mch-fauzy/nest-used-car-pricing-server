export interface ResponseWithError {
  message: string;
  errors: unknown;
}

export interface ResponseWithData {
  message: string;
  data: unknown;
}
