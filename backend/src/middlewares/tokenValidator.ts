import { NextFunction, Request, Response } from 'express';

import token from '@utils/token';

const guard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, nickname } = token.decodeJWT(req.cookies.access_token);
    res.locals.id = id;
    res.locals.nickname = nickname;
    next();
  } catch (err) {
    const { accessToken, refreshToken, id, nickname } = await token.handleAccessTokenExpired(
      req.cookies.refresh_token
    );
    res.cookie('access_token', accessToken, { httpOnly: true });
    res.cookie('refresh_token', refreshToken, { httpOnly: true });

    res.locals.id = id;
    res.locals.nickname = nickname;
    next();
  }
};

export default guard;
