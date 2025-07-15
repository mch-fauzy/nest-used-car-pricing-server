import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { CONFIG } from '../configs';

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: CONFIG.POSTGRES.HOST,
  port: CONFIG.POSTGRES.PORT,
  database: CONFIG.POSTGRES.DATABASE,
  username: CONFIG.POSTGRES.USERNAME,
  password: CONFIG.POSTGRES.PASSWORD,
  ssl: CONFIG.POSTGRES.SSL
    ? {
        rejectUnauthorized: CONFIG.POSTGRES.SSL_REJECT_UNAUTHORIZED,
      }
    : false,
  entities: ['src/modules/**/*.entity{.ts,.js}'],
  synchronize: CONFIG.POSTGRES.SYNCHRONIZE,
  namingStrategy: new SnakeNamingStrategy(),
  migrations: ['src/infrastructure/database/migrations/*{.ts,.js}'],
  extra: {
    options: `-c timezone=${CONFIG.SERVER.TIMEZONE}`,
  },
};

// Export for TypeORM CLI
export default new DataSource(typeOrmConfig);
