import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize, errors } = format;

// Custom log line format: 2026-07-26 10:00:00 [INFO] message
const logFormat = printf(({ level, message, timestamp: ts, stack }) => {
    return `${ts} [${level.toUpperCase()}] ${stack || message}`;
});

/**
 * Central Winston logger used across the framework.
 * Logs to the console and to logs/test-execution.log.
 */
const logger = createLogger({
    //level: env.logLevel,
    format: combine(
        errors({ stack: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.Console({
            format: combine(
                colorize(),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                logFormat
            ),
        }),
        new transports.File({ filename: 'logs/test-execution.log' }),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
    ],
});

export default logger;
