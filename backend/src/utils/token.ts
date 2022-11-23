import { prisma } from '@config/orm.config';
import jwt, { JwtPayload } from 'jsonwebtoken';

const generateJWT = (expiresIn: '3h' | '7d', payload: { id?: number; nickname?: string } = {}) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
};

const decodeJWT = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayload;
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
  const matchedToken = await prisma.token.findFirst({
    where: {
      refresh_token,
    },
    select: {
      user_id: true,
      user: {
        select: {
          nickname: true,
        },
      },
    },
  });
  if (!matchedToken) return false;
  return matchedToken;
};

export default {
  generateJWT,
  decodeJWT,
  getTokens,
  saveRefreshToken,
  checkRefreshTokenValid,
};
