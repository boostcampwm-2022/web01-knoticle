import { Request, Response } from 'express';

import imagesService from '@apis/images/images.service';

const createImage = async (req: Request, res: Response) => {
  console.log(req.file);
  const imagePath = await imagesService.createImage({ file: req.file });

  res.status(201).send({ imagePath });
};

export default {
  createImage,
};
