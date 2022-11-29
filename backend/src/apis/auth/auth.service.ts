import axios from 'axios';
import { hash, compare } from 'bcrypt';

import { prisma } from '@config/orm.config';
import { ResourceConflict, Message, Unauthorized } from '@errors';

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
      description: `안녕하세요 ${nickname}입니다.`,
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

const checkOverlapBeforeSignUp = async (username: string, nickname: string) => {
  if (!(await checkLocalUsernameUnique(username))) {
    throw new ResourceConflict(Message.AUTH_USERNAME_OVERLAP);
  }
  if (!(await checkNicknameUnique(nickname))) {
    throw new ResourceConflict(Message.AUTH_NICKNAME_OVERLAP);
  }
};

const signUpLocalUser = async (username: string, password: string, nickname: string) => {
  const encryptedPassword = await hash(password, Number(process.env.BCRYPT_SALT));

  await prisma.user.create({
    data: {
      username,
      nickname,
      provider: 'local',
      password: encryptedPassword,
      profile_image: '',
      description: `안녕하세요 ${nickname}입니다.`,
    },
  });
};

export default {
  getSignedUser,
  getGithubAccessToken,
  getUserByGithubAPI,
  getUserByLocalDB,
  signUpGithubUser,
  checkOverlapBeforeSignUp,
  signUpLocalUser,
};
