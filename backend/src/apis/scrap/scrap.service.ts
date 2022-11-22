import { prisma } from '@config/orm.config';

interface createScrapProps {
  order: number;
  is_original: boolean;
  book_id: number;
  article_id: number;
}

const createScrap = async (dto: createScrapProps) => {
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

export default {
  createScrap,
};
