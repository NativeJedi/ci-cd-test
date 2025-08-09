import * as process from 'node:process';
import 'dotenv/config';

const AppConfig = {
  DATABASE_URL: process.env.DATABASE_URL || '',
  PORT: process.env.PORT || 3000,
  ENV: process.env.NODE_ENV || 'production',
  MIGRATIONS_DIR: process.env.MIGRATIONS_DIR || './migrations/*.js',
};

export { AppConfig };
