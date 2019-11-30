import Server from './server';
import { logger } from './utils';

require('dotenv').config();

const { PORT } = process.env;

try {
  const app = new Server();
  app.runServer(PORT);
} catch (error) {
  logger.error({
    level: 'error',
    message: `Server error: ${error.message}`,
    service: 'chloe-server',
  });
}
