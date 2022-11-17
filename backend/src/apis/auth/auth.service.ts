import axios from 'axios';
import jwt from 'jsonwebtoken';

import { prisma } from '../../config/orm.config';
import { Message, Unauthorized } from '../../errors';

const getSignedUser = async (username: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username,
      provider: 'local',
    },
    select: {
      id: true,
      nickname: true,
      password: true,
    },
  });

  if (!user) throw new Unauthorized(Message.AUTH_WRONG);

  if (user.password !== password) throw new Unauthorized(Message.AUTH_WRONG);

  return user;
};

const getTokens = (userId: number) => {
  const accessToken = generateJWT('3h', { id: userId });
  const refreshToken = generateJWT('7d');

  return {
    accessToken,
    refreshToken,
  };
};

const generateJWT = (expiresIn: '3h' | '7d', payload: { id?: number } = {}) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
};

const decodeJWT = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

const saveRefreshToken = async (userId: number, refreshToken: string) => {
  await prisma.token.upsert({
    where: {
      user_id: userId,
    },
    update: {
      refresh_token: refreshToken,
    },
    create: {
      user_id: userId,
      refresh_token: refreshToken,
    },
  });
};

const getGithubAccessToken = async (code: string) => {
  const { data } = await axios.post(
    process.env.GH_OAUTH_URL,
    {
      client_id: process.env.GH_ID,
      client_secret: process.env.GH_SECRET,
      code: code,
    },
    {
      headers: {
        accept: 'application/json',
      },
    }
  );

  return data.access_token;
};
const getGithubUserProfile = async (accessToken: string) => {
  const { data } = await axios.get(process.env.GH_API_USER_URL, {
    headers: { authorization: `token ${accessToken}` },
  });

  return { username: data.login, provider_id: data.id };
};

export default {
  getSignedUser,
  getTokens,
  saveRefreshToken,
  getGithubAccessToken,
  getGithubUserProfile,
};
