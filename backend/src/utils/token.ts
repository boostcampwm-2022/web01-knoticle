import jwt, { JwtPayload } from 'jsonwebtoken';

import { prisma } from '@config/orm.config';
import { Message, Unauthorized } from '@errors';

const generateJWT = (expiresIn: '3h' | '7d', payload: { id?: number; nickname?: string } = {}) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
};

const verifyJWT = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayload;
};

const decodeJWT = (token: string) => {
  return jwt.decode(token) as JwtPayload;
};

const getTokens = (userId: number, nickname: string) => {
  const accessToken = generateJWT('3h', { id: userId, nickname });
  const refreshToken = generateJWT('7d');

  return {
    accessToken,
    refreshToken,
  };
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

const checkRefreshTokenValid = async (refresh_token: string) => {
  try {
    verifyJWT(refresh_token);
  } catch (err) {
    throw new Unauthorized(Message.TOKEN_EXPIRED);
  }

  const matchedToken = await prisma.token.findFirst({
    where: {
      refresh_token,
    },
    select: {
      user_id: true,
    },
  });

  if (!matchedToken) throw new Unauthorized(Message.TOKEN_MALFORMED);
};

export default {
  generateJWT,
  verifyJWT,
  decodeJWT,
  getTokens,
  saveRefreshToken,
  checkRefreshTokenValid,
};
