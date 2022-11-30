import { NextFunction, Request, Response } from 'express';

import token from '@utils/token';

const decoder = async (req: Request, res: Response, next: NextFunction) => {
  const { access_token } = req.cookies;

  if (!access_token) return next();

  const { id, nickname } = token.decodeJWT(access_token);

  res.locals.user = { id, nickname };

  next();
};

export default decoder;
