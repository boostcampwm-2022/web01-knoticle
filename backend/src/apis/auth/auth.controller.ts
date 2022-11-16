import { Request, Response } from 'express';

import { Unauthorized, Message } from '../../errors';
import authService from './auth.service';

const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (/[^a-zA-Z0-9]/.test(username) || username.length > 10)
    throw new Unauthorized(Message.AUTH_WRONG);

  const user = await authService.getSignedUser(username, password);

  const { accessToken, refreshToken } = authService.getTokens(user.id);

  await authService.saveRefreshToken(user.id, refreshToken);

  res.cookie('access_token', accessToken, { httpOnly: true });
  res.cookie('refresh_token', refreshToken, { httpOnly: true });

  res.status(200).send({ id: user.id, nickname: user.nickname });
};

export default {
  signIn,
};
