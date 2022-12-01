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

const updateScraps = async (scraps: IScrap[]) => {
  const result: any[] = [];
  scraps.forEach(async (scrap) => {
    console.log(scrap);
    result.push(
      await prisma.scrap.update({
        where: {
          id: scrap.id,
        },
        data: {
          order: scrap.order,
        },
      })
    );
  });

  console.log('result', result);
  return result;
};

export default {
  createScrap,
  checkScrapExists,
  updateScraps,
};
