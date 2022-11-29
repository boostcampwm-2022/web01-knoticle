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

  if (!(await checkNicknameUnique(nickname)))
    throw new ResourceConflict(Message.AUTH_NICKNAME_OVERLAP);

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      profile_image,
      nickname,
      description,
    },
  });
};

// authService에서 중복되서 사용했는데 어떻게 하면 좋을지... 같은 레이어층 가져와서 써도 될까요...?
const checkNicknameUnique = async (nickname: string) => {
  const user = await prisma.user.findFirst({
    where: {
      nickname,
    },
  });

  return !user ? true : false;
};

export default {
  findUserProfile,
  updateUserProfile,
};
