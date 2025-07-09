import { PaginationMetadata } from '../interfaces/metadata.interface';

/* This interface defines a contract for objects that will be used for pagination calculations */
interface PaginationInput {
  count: number;
  page: number;
  perPage: number;
}

export class PaginationUtil {
  /**
   * Maps the given pagination parameters to a `PaginationMetadata` object.
   *
   * @param params - An object containing pagination calculation parameters.
   * @returns An object containing pagination metadata, including the current page,
   * number of items per page, total number of items, and total number of pages.
   */
  static mapMetadata(params: PaginationInput): PaginationMetadata {
    const page = params.page;
    const perPage = params.perPage;

    return {
      page: page,
      perPage: perPage,
      total: params.count,
      totalPage: Math.ceil(params.count / perPage),
    };
  }
}
