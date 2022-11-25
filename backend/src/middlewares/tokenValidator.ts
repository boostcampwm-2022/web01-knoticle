import { NextFunction, Request, Response } from 'express';

import { Unauthorized, Message } from '@errors';
import token from '@utils/token';

const guard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, nickname } = token.verifyJWT(req.cookies.access_token);
    res.locals.user = { id, nickname };
    next();
  } catch (err) {
    if (err.message === 'jwt expired') {
      const { id, nickname } = token.decodeJWT(req.cookies.access_token);

      await token.checkRefreshTokenValid(req.cookies.refresh_token);

      const { accessToken, refreshToken } = token.getTokens(id, nickname);

      await token.saveRefreshToken(id, refreshToken);

      res.cookie('access_token', accessToken, { httpOnly: true });
      res.cookie('refresh_token', refreshToken, { httpOnly: true });

      res.locals.user = { id, nickname };

      next();
    } else throw new Unauthorized(Message.TOKEN_MALFORMED);
  }
};

export default guard;
