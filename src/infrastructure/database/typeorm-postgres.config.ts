import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { CONFIG } from '../configs';
import { User } from 'src/modules/user/entities/user.entity';
import { Report } from 'src/modules/report/entities/report.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: CONFIG.POSTGRES.HOST,
  port: Number(CONFIG.POSTGRES.PORT),
  database: CONFIG.POSTGRES.DATABASE,
  username: CONFIG.POSTGRES.USERNAME,
  password: CONFIG.POSTGRES.PASSWORD,
  entities: [User, Report],
  synchronize: Boolean(CONFIG.POSTGRES.SYNCHRONIZE),
  /* Set timezone to UTC, better set it in .env */
  extra: {
    options: '-c timezone=UTC',
  },
};
