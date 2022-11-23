import { NextFunction, Request, Response } from 'express';

import { Unauthorized } from '@errors/index';
import Message from '@errors/messages';
import token from '@utils/token';

const tokenValidator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, nickname } = token.decodeJWT(req.cookies.access_token);
    res.locals.id = id;
    res.locals.nickname = nickname;
    next();
  } catch (err) {
    const { accessToken, refreshToken, id, nickname } = await handleAccessTokenExpired(
      req.cookies.refresh_token
    );
    res.cookie('access_token', accessToken, { httpOnly: true });
    res.cookie('refresh_token', refreshToken, { httpOnly: true });

    res.locals.id = id;
    res.locals.nickname = nickname;
    next();
  }
};

const handleAccessTokenExpired = async (refresh_token: string) => {
  const matchedToken = await token.checkRefreshTokenValid(refresh_token);
  if (!matchedToken) throw new Unauthorized(Message.TOKEN_EXPIRED);
  else {
    const newTokens = token.getTokens(matchedToken.user_id, matchedToken.user.nickname);

    await token.saveRefreshToken(matchedToken.user_id, newTokens.refreshToken);

    return {
      ...newTokens,
      id: matchedToken.user_id,
      nickname: matchedToken.user.nickname,
    };
  }
};

export default tokenValidator;
