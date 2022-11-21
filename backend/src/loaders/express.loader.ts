import { Application, ErrorRequestHandler, json, urlencoded } from 'express';

import cors from 'cors';
import logger from 'morgan';

import router from '@apis';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { status, message } = err;

  res.status(status).json({ message });
};

export default (app: Application) => {
  app.use(logger('dev'));
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(cors({ credentials: true, origin: process.env.ORIGIN_URL }));
  app.use('/api', router);
  app.use(errorHandler);
};
