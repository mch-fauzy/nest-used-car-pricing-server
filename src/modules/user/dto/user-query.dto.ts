import { createZodDto } from 'nestjs-zod';
import { paginationSchema } from 'src/common/dto/pagination.dto';

const userQuerySchema = paginationSchema.extend({});

export class UserQueryDto extends createZodDto(userQuerySchema) {}
