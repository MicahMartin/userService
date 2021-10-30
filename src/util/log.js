import log4js from 'log4js';

export const initLog = () => log4js.configure({
  appenders: {
    debug: {
      type: 'file', filename: 'logs/debug.log', maxLogSize: 1000000, backups: 3, compress: true,
    },
    access: {
      type: 'file', filename: 'logs/access.log', maxLogSize: 1000000, backups: 3, compress: true,
    },
    request: {
      type: 'file', filename: 'logs/request.log', maxLogSize: 1000000, backups: 3, compress: true,
    },
  },
  categories: {
    default: { appenders: ['debug'], level: `${process.env.LOG_LEVEL.toUpperCase()}` },
    access: { appenders: ['access'], level: `${process.env.LOG_LEVEL.toUpperCase()}` },
    request: { appenders: ['request'], level: `${process.env.LOG_LEVEL.toUpperCase()}` },
  },
  disableClustering: true,
});

const requestLogger = log4js.getLogger('request');
export const logRequest = (req, res, next) => {
  const bodyStr = JSON.stringify(req.body) || '';
  requestLogger.debug(`${req.method} ${req.originalUrl} ${bodyStr}`);
  next();
};
export const accessLogger = log4js.getLogger('access');
export const debugLogger = log4js.getLogger('debug');
