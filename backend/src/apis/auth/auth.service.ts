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

export default {
  getSignedUser,
  getTokens,
  saveRefreshToken,
};
