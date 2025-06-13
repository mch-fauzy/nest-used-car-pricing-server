import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { PAGINATION } from '../constants/pagination.constant';

const preprocessPaginationSchema = (defaultValue: number, maxValue?: number) =>
  z.preprocess(
    (val) => {
      const num = Number(val);
      /* If pagination query param not a number, use default value */
      return isNaN(num) ? defaultValue : num;
    },

    /* Set maxValue if provided */
    maxValue
      ? z.number().int().positive().max(maxValue)
      : z.number().int().positive(),
  );

export const paginationSchema = z.object({
  page: preprocessPaginationSchema(PAGINATION.DEFAULT_PAGE),
  limit: preprocessPaginationSchema(
    PAGINATION.DEFAULT_LIMIT,
    PAGINATION.DEFAULT_UPPER_LIMIT,
  ),
});

export class PaginationDto extends createZodDto(paginationSchema) {}
