import path from 'path';
import { Logger, createLogger, format, transports } from 'winston';

declare global {
    //eslint-disable-next-line no-var
    var RNUM_LOGGER: Logger;
}

export const getLogger = () => {
    // cache our logger in a global to avoid instantiating multiple times
    if (!global.RNUM_LOGGER) {
        const logger = createLogger({
        level: 'info',
        exitOnError: false,
        format: format.json(),
        transports: [
            new transports.File({ filename: `${path.resolve(__dirname, '..')}/logs/error.log`, level: 'error' }),
            new transports.File({ filename: `${path.resolve(__dirname, '..')}/logs/logs.log` }),
        ],
        });
        if (process.env.NODE_ENV !== 'production') {
            logger.add(new transports.Console({
              format: format.simple(),
            }));
          }

        global.RNUM_LOGGER = logger;
        return logger;
    } else {
        return global.RNUM_LOGGER;
    }
};