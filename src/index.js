import express from 'express';
import log4js from 'log4js';
import dotenv from 'dotenv';
import { initLog, accessLogger, debugLogger } from './util/log';

import StatusRouter from './routes/StatusRouter';
import UserRouter from './routes/UserRouter';

dotenv.config();
initLog();

const server = express();
const port = process.env.PORT_NUM.toUpperCase();

server.use(log4js.connectLogger(accessLogger, { level: 'info' }));
server.use(express.json());

// Users & Transactions would be in their own microservice since their APIs have the potential to touch many domains
server.use('/v1/users', UserRouter);

// Health check stuff
server.use('/status', StatusRouter);
server.use('/logs', express.static('logs'));

console.info(`rundoo user service up on port ${port}`);
debugLogger.info(`rundoo user service up on port ${port}`);

server.listen(port);
