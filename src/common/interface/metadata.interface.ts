/* Defines the shape of an object that contains pagination metadata */
export interface PaginationMetadata {
  page: number;
  perPage: number;
  total: number;
  totalPage: number;
}