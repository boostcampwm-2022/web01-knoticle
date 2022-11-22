import { Request, Response } from 'express';

import imageService from '@apis/image/image.service';

const createImage = async (req: Request, res: Response) => {
  const imagePath = await imageService.createImage({ file: req.file });

  res.status(201).send({ imagePath });
};

export default {
  createImage,
};
