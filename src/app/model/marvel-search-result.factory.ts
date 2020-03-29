import { MarvelCharacter } from './marvel-character';
import { MarvelSearchResult } from './marvel-search-result';
import { MarvelComic } from './marvel-comic';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MarvelSearchResultFactory {

  fromCharacter(character: MarvelCharacter): MarvelSearchResult {
    return {
      id: character.id,
      search: character.name
    };
  }

  fromComic(comic: MarvelComic): MarvelSearchResult {
    return {
      id: comic.id,
      search: comic.title
    };
  }

}
