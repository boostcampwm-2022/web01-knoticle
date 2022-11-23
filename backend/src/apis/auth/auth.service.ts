import axios from 'axios';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { prisma } from '@config/orm.config';
import { Message, Unauthorized } from '@errors';

const SALT = 12;

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

  if (!(await compare(password, user.password))) throw new Unauthorized(Message.AUTH_WRONG);

  return user;
};

const getTokens = (userId: number, nickname: string) => {
  const accessToken = generateJWT('3h', { id: userId, nickname });
  const refreshToken = generateJWT('7d');

  return {
    accessToken,
    refreshToken,
  };
};

const generateJWT = (expiresIn: '3h' | '7d', payload: { id?: number; nickname?: string } = {}) => {
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

const getUserByGithubAPI = async (accessToken: string) => {
  const { data } = await axios.get(process.env.GH_API_USER_URL, {
    headers: { authorization: `token ${accessToken}` },
  });

  return { username: data.login, provider_id: String(data.id) };
};

const getUserByLocalDB = async (provider_id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      provider: 'github',
      username: provider_id,
    },
    select: {
      id: true,
      nickname: true,
    },
  });
  return user;
};

const signUpGithubUser = async (username: string, provider_id: string) => {
  const nickname = await createUniqueNickname(username);
  const user = await prisma.user.create({
    data: {
      username: provider_id,
      nickname,
      provider: 'github',
      password: '',
      profile_image: '',
    },
  });

  return user;
};

const createUniqueNickname = async (username: string) => {
  let nickname = username;

  while (true) {
    if (await checkNicknameUnique(nickname)) break;
    nickname += String(Math.floor(Math.random() * 10000));
  }

  return nickname;
};

const checkNicknameUnique = async (nickname: string) => {
  const user = await prisma.user.findFirst({
    where: {
      nickname,
    },
  });

  return !user ? true : false;
};

const checkLocalUsernameUnique = async (username: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username,
      provider: 'local',
    },
  });

  return !user ? true : false;
};

const signUpLocalUser = async (username: string, password: string, nickname: string) => {
  const encryptedPassword = await hash(password, SALT);

  const user = await prisma.user.create({
    data: {
      username,
      nickname,
      provider: 'local',
      password: encryptedPassword,
      profile_image: '',
    },
  });

  return user;
};

export default {
  getSignedUser,
  getTokens,
  saveRefreshToken,
  getGithubAccessToken,
  getUserByGithubAPI,
  getUserByLocalDB,
  signUpGithubUser,
  checkLocalUsernameUnique,
  checkNicknameUnique,
  signUpLocalUser,
};
