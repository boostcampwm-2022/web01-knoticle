import { Request, Response } from 'express';

import { IScrap } from '@apis/scraps/scraps.interface';

import scrapsService from './scraps.service';

const createScrap = async (req: Request, res: Response) => {
  const { book_id, article_id, scraps } = req.body;

  scraps.forEach(async (scrap: IScrap) => {
    if (scrap.id === 0) {
      await scrapsService.createScrap({
        order: scrap.order,
        is_original: false,
        book_id,
        article_id: article_id,
      });
    } else {
      await scrapsService.updateScrapOrder(scrap);
    }
  });

  res.status(201).send();
};

const deleteScrap = async (req: Request, res: Response) => {
  const scrapId = Number(req.params.scrapId);
  await scrapsService.deleteScrap(scrapId);

  res.status(200).send();
};
const getScraps = async (req: Request, res: Response) => {
  const scraps = await scrapsService.getScraps();

  res.status(200).send(scraps);
};

const updateScrapsOrder = async (req: Request, res: Response) => {
  const scraps = req.body;
  scraps.forEach(async (scrap: IScrap) => {
    await scrapsService.updateScrapOrder(scrap);
  });

  res.status(200).send();
};

export default {
  createScrap,
  deleteScrap,
  getScraps,
  updateScrapsOrder,
};
