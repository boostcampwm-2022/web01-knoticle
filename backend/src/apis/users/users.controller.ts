import { Request, Response } from 'express';

import usersService from 'apis/users/users.service';

const getUserProfile = async (req: Request, res: Response) => {
  const userNickname = req.query.nickname as string;

  const userProfile = await usersService.findUserProfile(userNickname);

  res.status(200).send(userProfile);
};

export default {
  getUserProfile,
};
