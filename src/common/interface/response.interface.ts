// TODO: Delete when unused
export interface ResponseWithError {
  message: string;
  errors: unknown;
}

// TODO: Delete when unused
export interface ResponseWithData {
  message: string;
  data: unknown;
}

/* Defines the shape of an object that contains pagination metadata */
export interface PaginationMetadata {
  page: number;
  perPage: number;
  total: number;
  totalPage: number;
}

/* Generic interface that represents a response with pagination metadata and a list of items */
export interface PaginationResponse<T> {
  metadata: PaginationMetadata;
  items: Array<T>;
}

/*
 * Generic interface that can be used to represent a response with a message and some data.
 * The T is a type parameter, which means it can be replaced with any type when the interface is used.
 **/
export interface ApiResponse<T> {
  message: string;
  data: T | null;
}
