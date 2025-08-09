import { DataSource } from 'typeorm';
import { TypeOrmConfig } from './config';

const AppDataSource = new DataSource(TypeOrmConfig);

export { AppDataSource };
