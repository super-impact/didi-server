import 'reflect-metadata';

import Container from 'typedi';
import { ConnectionOptions, createConnection, useContainer } from 'typeorm';

import { logger } from '../utils';

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

async function connectDatabase() {
  try {
    const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } = process.env;

    const options: ConnectionOptions = {
      type: 'mysql',
      host: DATABASE_HOST,
      port: 3306,
      username: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      entities: [__dirname + '/entity/*{.ts,.js}'],
      timezone: '+09:00', // Asia/Seoul
      synchronize: IS_DEVELOPMENT,
      logging: IS_DEVELOPMENT,
    };

    useContainer(Container);
    await createConnection(options);

    logger.info(`Success to connect database host: ${DATABASE_HOST}`);
  } catch (error) {
    throw error;
  }
}

export { connectDatabase };
