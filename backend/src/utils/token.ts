import { decode, JwtPayload, sign, verify } from 'jsonwebtoken';

import { prisma } from '@config/orm.config';
import { Message, Unauthorized } from '@errors';

const generateJWT = (expiresIn: '3h' | '7d', payload: { id?: number } = {}) => {
  return sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
};

const verifyJWT = (token: string) => {
  return verify(token, process.env.JWT_SECRET_KEY) as JwtPayload;
};

const decodeJWT = (token: string) => {
  return decode(token) as JwtPayload;
};

const getTokens = (userId: number) => {
  const accessToken = generateJWT('3h', { id: userId });
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
