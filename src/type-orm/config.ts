import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { AppConfig } from '../config';
import { Account } from '../account/entities/account.entity';

const ProductionConfig: DataSourceOptions = {
  type: 'postgres',
  url: AppConfig.DATABASE_URL,
  entities: [Account],
  synchronize: false,
  migrations: [AppConfig.MIGRATIONS_DIR],
};

const DevelopmentConfig: DataSourceOptions = {
  ...ProductionConfig,
  synchronize: true,
};

const envConfigMap: Record<string, DataSourceOptions> = {
  test: DevelopmentConfig,
  development: DevelopmentConfig,
  production: ProductionConfig,
};

const TypeOrmConfig = envConfigMap[AppConfig.ENV] || envConfigMap.production;

export { TypeOrmConfig };
