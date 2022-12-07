import { prisma } from '@config/orm.config';
import { Message, NotFound, ResourceConflict } from '@errors';

import { UpdateUserProfile } from './users.interface';

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

const updateUserProfile = async (dto: UpdateUserProfile) => {
  const { id, nickname, profile_image, description } = dto;

  const user = await getUserByNickname(nickname);

  if (user && user.id !== id) throw new ResourceConflict(Message.AUTH_NICKNAME_OVERLAP);

  const userProfile = await prisma.user.update({
    where: {
      id,
    },
    data: {
      profile_image,
      nickname,
      description,
    },
  });

  return userProfile;
};

const getUserByNickname = async (nickname: string) => {
  const user = await prisma.user.findFirst({
    where: {
      nickname,
    },
  });

  return user;
};

const getUserById = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!user) throw new NotFound(Message.USER_NOTFOUND);

  return user;
};

export default {
  findUserProfile,
  updateUserProfile,
  getUserById,
};
