import { NodemailerTransport } from '@qccareerschool/winston-nodemailer';
import { createLogger, format, transports } from 'winston';

import config from './config.mjs';

const logger = createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.splat(),
    format.metadata({ fillExcept: [ 'level', 'message', 'timestamp' ] }),
    format.json({ space: 2 }),
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
    new NodemailerTransport({
      host: config.logEmail.host,
      port: config.logEmail.port,
      secure: config.logEmail.mode === 'TLS',
      auth: {
        user: config.logEmail.username,
        pass: config.logEmail.password,
      },
      from: config.logEmail.from,
      to: config.logEmail.to,
      tags: [ 'leads' ],
      level: 'warn',
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple(),
  }));
}

export const logError = (message: string, ...meta: unknown[]): void => {
  logger.error(message, meta);
};

export const logWarning = (message: string, ...meta: unknown[]): void => {
  logger.warn(message, meta);
};

export const logInfo = (message: string, ...meta: unknown[]): void => {
  logger.info(message, meta);
};

export const logDebug = (message: string, ...meta: unknown[]): void => {
  logger.debug(message, meta);
};
