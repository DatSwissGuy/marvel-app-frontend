import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, take } from 'rxjs/operators';
import { MarvelApiResponse } from '../model/marvel-api-response';
import { MarvelCharacter } from '../model/marvel-character';
import { MarvelApiResults } from '../model/marvel-api-results';
import { MarvelComic } from '../model/marvel-comic';

@Injectable({
  providedIn: 'root'
})
export class MarvelApiService {

  constructor(private http: HttpClient) {
  }

  baseUrl = environment.marvelApiUrl;
  offset = environment.apiInitialOffset;
  limit = environment.apiResultLimit;

  getCharacters(offset: number = this.offset, limit: number = this.limit, search?: string): Observable<MarvelApiResults<MarvelCharacter>> {
    const queryParams: string[] = [
      `offset=${offset}`,
      `limit=${limit}`
    ];

    if (search) {
      queryParams.push(`nameStartsWith=${search}`);
    }
    return this.http
      .get<MarvelApiResponse<MarvelCharacter>>(`${this.baseUrl}/characters?${queryParams.join('&')}`)
      .pipe(
        map(response => response.data),
        take(1)
      );
  }

  getCharacterDetail(characterId: number): Observable<MarvelApiResults<MarvelCharacter>> {
    return this.http
      .get<MarvelApiResponse<MarvelCharacter>>(`${this.baseUrl}/characters/${characterId}`)
      .pipe(
        map(response => response.data),
        take(1)
      );
  }

  getCharacterComics(
    offset: number = this.offset,
    limit: number = this.limit,
    characterId?: number, search?: string): Observable<MarvelApiResults<MarvelComic>> {
    return this.getCharacterComicType('comics', offset, limit, characterId, search);
  }

  getCharacterSeries(
    offset: number = this.offset,
    limit: number = this.limit,
    characterId?: number,
    search?: string): Observable<MarvelApiResults<MarvelComic>> {
    return this.getCharacterComicType('series', offset, limit, characterId, search);
  }

  getCharacterStories(
    offset: number = this.offset,
    limit: number = this.limit,
    characterId?: number): Observable<MarvelApiResults<MarvelComic>> {
    return this.getCharacterComicType('stories', offset, limit, characterId);
  }

  getCharacterEvents(
    offset: number = this.offset,
    limit: number = this.limit,
    characterId?: number,
    search?: string): Observable<MarvelApiResults<MarvelComic>> {
    return this.getCharacterComicType('events', offset, limit, characterId, search);
  }

  getCharacterComicType(type: string, offset: number, limit: number, characterId?: number, search?: string) {
    const queryParams: string[] = [
      `offset=${offset}`,
      `limit=${limit}`
    ];

    // TODO change to one single line -> search ? titleStarts : nameStarts
    if (search && type !== 'events') {
      queryParams.push(`titleStartsWith=${search}`);
    }
    if (search && type === 'events') {
      queryParams.push(`nameStartsWith=${search}`);
    }

    return this.http
      .get<MarvelApiResponse<MarvelComic>>(`${this.baseUrl}/characters/${characterId}/${type}?${queryParams.join('&')}`)
      .pipe(
        map(response => response.data),
        take(1)
      );
  }

}
