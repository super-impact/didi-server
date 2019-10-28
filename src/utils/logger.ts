import winston from 'winston';

const { combine, timestamp, prettyPrint } = winston.format;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'didi-server' },
  transports: [
    new winston.transports.File({ filename: 'logs/all.log' }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: combine(timestamp(), prettyPrint()),
  }),
);

export default logger;
