import { Router } from 'express';
import { debugLogger, logRequest } from '../util/log';
import { version } from '../../package.json';

const StatusRouter = new Router();

StatusRouter.get('/', logRequest, async (req, res, next) => {
  const statusObj = {
    tier: process.env.TIER.toUpperCase(),
    version,
  };

  res.json(statusObj);
});

StatusRouter.use((err, req, res, next) => {
  debugLogger.error(err);
  console.error(err);
  res.status(err.status || 500).json({ status: err.status, message: err.message });
});

export default StatusRouter;
