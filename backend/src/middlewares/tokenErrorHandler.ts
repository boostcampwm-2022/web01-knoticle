import { ErrorRequestHandler } from 'express';

export const tokenErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (!err) return next();

  return res.status(200).send({ id: 0 });
};
