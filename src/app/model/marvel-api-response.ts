import { MarvelApiResults } from './marvel-api-results';

export interface MarvelApiResponse<T> {
  attributionText: string;
  data: MarvelApiResults<T>;
}
