import { config } from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: ['dist/**/entities/*.entity.{ts,js}'],
    migrations: ['dist/db/migrations/*.{ts,js}'],
};

export const dataSource = new DataSource(dataSourceOptions);
