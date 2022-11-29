import { prisma } from '@config/orm.config';
import { Message, NotFound } from '@errors';

const findUserProfile = async (nickname: string) => {
  const userProfile = await prisma.user.findFirst({
    where: {
      nickname,
    },
    select: {
      id: true,
      profile_image: true,
      nickname: true,
      description: true,
    },
  });

  if (!userProfile) throw new NotFound(Message.USER_NOTFOUND);

  return userProfile;
};

export default {
  findUserProfile,
};
