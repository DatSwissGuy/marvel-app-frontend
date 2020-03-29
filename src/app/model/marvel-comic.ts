import { MarvelThumbnail } from './marvel-thumbnail';

export interface MarvelComic {
  id: number;
  title: string;
  description: string;
  thumbnail: MarvelThumbnail;
}
