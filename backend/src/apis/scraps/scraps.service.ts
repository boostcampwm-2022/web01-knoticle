import { CreateScrap, IScrap } from '@apis/scraps/scraps.interface';
import { prisma } from '@config/orm.config';
import { ResourceConflict } from '@errors/error';
import Message from '@errors/message';

const createScrap = async (dto: CreateScrap) => {
  const { order, is_original, book_id, article_id } = dto;

  const scrap = await prisma.scrap.create({
    data: {
      order,
      is_original,
      book: {
        connect: {
          id: book_id,
        },
      },
      article: {
        connect: {
          id: article_id,
        },
      },
    },
  });

  return scrap;
};

const checkScrapExists = async (dto: CreateScrap) => {
  const { book_id, article_id } = dto;

  const scrap = await prisma.scrap.findFirst({
    where: {
      book_id,
      article_id,
    },
  });

  if (scrap) throw new ResourceConflict(Message.SCRAP_OVERLAP);
};

const updateScraps = async (scraps: IScrap) => {
  const scrap = await prisma.scrap.update({
    where: {
      id: scraps.id,
    },
    data: {
      order: scraps.order,
    },
  });
  return scrap;
};

const getScraps = async () => {
  const scraps = await prisma.scrap.findMany({
    where: {
      is_original: true,
    },
    select: {
      book_id: true,
      article_id: true,
    },
  })
  return scraps;
}

export default {
  createScrap,
  checkScrapExists,
  updateScraps,
  getScraps,
};
