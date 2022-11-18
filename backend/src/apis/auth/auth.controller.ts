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

const signInGithub = async (req: Request, res: Response) => {
  const { code } = req.body;

  const githubAccessToken = await authService.getGithubAccessToken(code);

  const { username, provider_id } = await authService.getUserByGithubAPI(githubAccessToken);

  const githubUser = await authService.getUserByLocalDB(provider_id);

  // 랜덤 피해주는 로직 더 하고 싶으면 하세요
  if (!githubUser) {
    let nickname = username;
    while (!(await authService.checkNicknameUnique(nickname))) {
      nickname += String(Math.floor(Math.random() * 10000));
    }
    await authService.signUpGithubUser(nickname, provider_id);
  }

  const { accessToken, refreshToken } = authService.getTokens(githubUser.id);

  await authService.saveRefreshToken(githubUser.id, refreshToken);

  res.cookie('access_token', accessToken, { httpOnly: true });
  res.cookie('refresh_token', refreshToken, { httpOnly: true });

  res.status(200).send({ id: githubUser.id, nickname: githubUser.nickname });
};

export default {
  signIn,
  signInGithub,
};
