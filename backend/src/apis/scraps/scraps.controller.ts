import { Request, Response } from 'express';

import { IScrap } from '@apis/scraps/scraps.interface';

import scrapsService from './scraps.service';

const createScrap = async (req: Request, res: Response) => {
  const { book_id, article_id, scraps } = req.body;

  const result: any[] = [];
  scraps.forEach(async (scrap: IScrap) => {
    if (scrap.id === 0) {
      result.push(
        await scrapsService.createScrap({
          order: scrap.order,
          is_original: true,
          book_id,
          article_id: article_id,
        })
      );
    } else {
      result.push(await scrapsService.updateScraps(scrap));
    }
  });

  res.status(201).send();
};

const getScraps = async (req: Request, res: Response) => {
  const scraps = await scrapsService.getScraps();

  res.status(200).send(scraps);
};

export default {
  createScrap,
  getScraps,
};
