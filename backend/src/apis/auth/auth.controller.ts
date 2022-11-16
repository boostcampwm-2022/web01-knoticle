import { Request, Response } from 'express';

import { getSignInResult } from './auth.service';

export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (/[^a-zA-Z0-9]/.test(username) || username.length > 10) {
    throw new Error();
  }

  const userInfo = await getSignInResult(username, password);

  return userInfo;
};
