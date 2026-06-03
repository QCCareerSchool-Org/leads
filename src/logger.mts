import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.splat(),
    format.metadata({ fillExcept: [ 'level', 'message', 'timestamp' ] }),
    format.json({ space: 2 }),
  ),
  transports: [
    new transports.Console({ format: format.simple() }),
  ],
});

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
