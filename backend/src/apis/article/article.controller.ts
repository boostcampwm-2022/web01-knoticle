import { Request, Response } from 'express';

const publish = async (req: Request, res: Response) => {
  res.status(200).send(req.body);
};

export default { publish };
