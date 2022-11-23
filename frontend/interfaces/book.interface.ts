import { Scrap } from './scrap.interface';

export interface Book {
  id: number;
  title: string;
  scraps: Scrap[];
}
