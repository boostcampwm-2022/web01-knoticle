import { Request, Response } from 'express';

import authService from '@apis/auth/auth.service';
import usersService from '@apis/users/users.service';
import { Unauthorized, Message } from '@errors';
import token from '@utils/token';

const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (/[^a-zA-Z0-9]/.test(username) || username.length > 10)
    throw new Unauthorized(Message.AUTH_WRONG);

  const user = await authService.getSignedUser(username, password);

  const { accessToken, refreshToken } = token.getTokens(user.id);

  await token.saveRefreshToken(user.id, refreshToken);

  res.cookie('access_token', accessToken, { httpOnly: true });
  res.cookie('refresh_token', refreshToken, { httpOnly: true });

  return res.status(200).send({ id: user.id, nickname: user.nickname });
};

const signInGithub = async (req: Request, res: Response) => {
  const { code } = req.body;

  const githubAccessToken = await authService.getGithubAccessToken(code);

  const { username, provider_id } = await authService.getUserByGithubAPI(githubAccessToken);

  const githubUser =
    (await authService.getUserByLocalDB(provider_id)) ||
    (await authService.signUpGithubUser(username, provider_id));

  const { accessToken, refreshToken } = token.getTokens(githubUser.id);

  await token.saveRefreshToken(githubUser.id, refreshToken);

  res.cookie('access_token', accessToken, { httpOnly: true });
  res.cookie('refresh_token', refreshToken, { httpOnly: true });

  return res.status(200).send({ id: githubUser.id, nickname: githubUser.nickname });
};

const signUp = async (req: Request, res: Response) => {
  const { username, password, nickname } = req.body;

  await authService.checkOverlapBeforeSignUp(username, nickname);

  await authService.signUpLocalUser(username, password, nickname);

  return res.status(201).send();
};

const checkSignInStatus = async (req: Request, res: Response) => {
  if (res.locals.user) {
    const userId = res.locals.user.id;

    const user = await usersService.getUserById(userId);

    return res.status(200).send({ id: user.id, nickname: user.nickname });
  }

  return res.status(200).send({ id: 0, nickname: '' });
};

const signOut = async (req: Request, res: Response) => {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');

  return res.status(200).send({ id: 0, nickname: '' });
};

export default {
  signIn,
  signInGithub,
  signUp,
  checkSignInStatus,
  signOut,
};
