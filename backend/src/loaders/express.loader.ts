import cors from 'cors';
import express, { Application, ErrorRequestHandler } from 'express';
import logger from 'morgan';

import router from '../apis';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { status, message } = err;

  res.status(status).json({ message });
};

export default (app: Application) => {
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use('/api', router);
  app.use(errorHandler);
};
