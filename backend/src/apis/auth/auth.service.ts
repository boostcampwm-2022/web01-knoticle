import jwt from 'jsonwebtoken';

import { prisma } from '../../config/orm.config';

export const getSignInResult = async (username: string, password: string) => {
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

  // 회원가입이 되어있지 않은 경우
  if (!user) throw new Error();

  // 비밀번호가 불일치하는 경우
  if (user.password !== password) throw new Error();

  const accessToken = generateJWT('3h', { id: user.id });
  const refreshToken = generateJWT('7d');

  await saveRefreshToken(user.id, refreshToken);

  return user;
};

const generateJWT = (expiresIn: '3h' | '7d', payload: { id?: number } = {}) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
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
