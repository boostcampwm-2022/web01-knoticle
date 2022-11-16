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

  if (!user) {
    // 회원가입이 되어있지 않은 경우
    throw new Error();
  }

  if (user.password !== password) {
    // 비밀번호가 불일치하는 경우
    throw new Error();
  }

  return user;
};
