import { Request, Response } from 'express';

import usersService from '@apis/users/users.service';

const getUserProfile = async (req: Request, res: Response) => {
  const userNickname = req.query.nickname as string;

  const userProfile = await usersService.findUserProfile(userNickname);

  res.status(200).send(userProfile);
};

// PATCH인데 id가 req.body에 담겨서 오다보니 params를 확인할 일이 없는데...
const editUserProfile = async (req: Request, res: Response) => {
  // const userId = Number(req.params.userId);

  console.log('editUserProfile', req.params, req.body);

  await usersService.updateUserProfile(req.body);

  res.status(204).send();
};

export default {
  getUserProfile,
  editUserProfile,
};
