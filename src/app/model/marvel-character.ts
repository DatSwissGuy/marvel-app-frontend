import { MarvelThumbnail } from './marvel-thumbnail';
import { MarvelCharacterComics } from './marvel-character-comics';
import { MarvelCharacterUrl } from './marvel-character-url';

export interface MarvelCharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: MarvelThumbnail;
  comics: MarvelCharacterComics;
  series: MarvelCharacterComics;
  stories: MarvelCharacterComics;
  events: MarvelCharacterComics;
  urls: MarvelCharacterUrl[];
}
