import { Action } from '@ngrx/store';
import { MarvelCharacter } from '../model/marvel-character';
import { MarvelApiResults } from '../model/marvel-api-results';
import { MarvelComic } from '../model/marvel-comic';

export enum MarvelActionTypes {
  RequestCharacterList = '[Marvel-Characters] Request characters',
  SuccessCharacterList = '[Marvel-Characters] Successfully fetched characters',
  RequestCharacterSearch = '[Marvel-Characters] Request character search',
  SuccessCharacterSearch = '[Marvel-Characters] Successfully fetched searched characters',
  RequestComicList = '[Marvel-Character] Request comics for character',
  SuccessComicList = '[Marvel-Character] Successfully fetched comics for character',
  RequestCharacterDetail = '[Marvel-Character] Request character detail',
  SuccessCharacterDetail = '[Marvel-Character] Successfully fetched character details',
  RequestComicSearch = '[Marvel-Character] Request comic search',
  SuccessComicSearch = '[Marvel-Character] Successfully fetched searched comics',
  RequestHttp = '[Marvel-App] Request Http',
  SuccessHttp = '[Marvel-App] Successful Http',
  RequestComicSeriesList = '[Marvel-Character] Request comic series for character',
  SuccessComicSeriesList = '[Marvel-Character] Successfully fetched comic series',
  RequestComicSeriesSearch = '[Marvel-Character-Comics] Request character series search',
  SuccessComicSeriesSearch = '[Marvel-Character-Comics] Successfully fetched searched character series',
  RequestComicStoriesList = '[Marvel-Character-Stories] Request comic stories for character',
  SuccessComicStoriesList = '[Marvel-Character-Stories] Successfully fetched comic stories for character',
  RequestComicEventsList = '[Marvel-Character-Events] Request comic events for character',
  SuccessComicEventsList = '[Marvel-Character-Events] Successfully fetched comic events for character',
  RequestCharacterEventsSearch = '[Marvel-Character-Events-Search] Request character event search',
  SuccessCharacterEventsSearch = '[Marvel-Character-Events-Search] Successfully fetched searched character events',
  RequestCharacterWikiUrl = '[Marvel-Character] Request wiki url',
  SuccessCharacterWikiUrl = '[Marvel-Character] Successfully fetched wiki url'
}

export class RequestCharacterList implements Action {
  readonly type = MarvelActionTypes.RequestCharacterList;

  constructor(public payload: { offset?: number, limit?: number, search?: string }) {
  }
}

export class SuccessCharacterList implements Action {
  readonly type = MarvelActionTypes.SuccessCharacterList;

  constructor(public payload: { apiResults: MarvelApiResults<MarvelCharacter> }) {
  }
}

export class RequestCharacterDetail implements Action {
  readonly type = MarvelActionTypes.RequestCharacterDetail;

  constructor(public payload: { characterId: number }) {
  }
}

export class SuccessCharacterDetail implements Action {
  readonly type = MarvelActionTypes.SuccessCharacterDetail;

  constructor(public payload: { apiResults: MarvelApiResults<MarvelCharacter> }) {
  }
}

export class RequestCharacterComicList implements Action {
  readonly type = MarvelActionTypes.RequestComicList;

  constructor(public payload: { offset?: number, limit?: number, characterId?: number, search?: string }) {
  }
}

export class SuccessCharacterComicList implements Action {
  readonly type = MarvelActionTypes.SuccessComicList;

  constructor(public payload: { apiResults: MarvelApiResults<MarvelComic> }) {
  }
}

export class RequestCharacterSearch implements Action {
  readonly type = MarvelActionTypes.RequestCharacterSearch;

  constructor(public payload: { offset?: number, limit?: number, search?: string }) {
  }
}

export class SuccessCharacterSearch implements Action {
  readonly type = MarvelActionTypes.SuccessCharacterSearch;

  constructor(public  payload: { apiResults: MarvelApiResults<MarvelCharacter> }) {
  }
}

export class RequestComicSearch implements Action {
  readonly type = MarvelActionTypes.RequestComicSearch;

  constructor(public payload: { offset?: number, limit?: number, characterId?: number, search?: string }) {
  }
}

export class SuccessComicSearch implements Action {
  readonly type = MarvelActionTypes.SuccessComicSearch;

  constructor(public payload: { apiResults: MarvelApiResults<MarvelComic> }) {
  }
}

export class RequestHttp implements Action {
  readonly type = MarvelActionTypes.RequestHttp;
}

export class SuccessHttp implements Action {
  readonly type = MarvelActionTypes.SuccessHttp;
}

export class RequestComicSeriesList implements Action {
  readonly type = MarvelActionTypes.RequestComicSeriesList;

  constructor(public payload: { offset?: number, limit?: number, characterId?: number, search?: string }) {
  }
}

export class SuccessComicSeriesList implements Action {
  readonly type = MarvelActionTypes.SuccessComicSeriesList;

  constructor(public payload: { apiResults: MarvelApiResults<MarvelComic> }) {
  }
}

export class RequestComicStoriesList implements Action {
  readonly type = MarvelActionTypes.RequestComicStoriesList;

  constructor(public payload: { offset?: number, limit?: number, characterId?: number, search?: string }) {
  }
}

export class SuccessComicStoriesList implements Action {
  readonly type = MarvelActionTypes.SuccessComicStoriesList;

  constructor(public payload: { apiResults: MarvelApiResults<MarvelComic> }) {
  }
}

export class RequestComicEventsList implements Action {
  readonly type = MarvelActionTypes.RequestComicEventsList;

  constructor(public payload: { offset?: number, limit?: number, characterId?: number, search?: string }) {
  }
}

export class SuccessComicEventsList implements Action {
  readonly type = MarvelActionTypes.SuccessComicEventsList;

  constructor(public payload: { apiResults: MarvelApiResults<MarvelComic> }) {
  }
}

export class RequestCharacterEventsSearch implements Action {
  readonly type = MarvelActionTypes.RequestCharacterEventsSearch;

  constructor(public payload: { offset?: number, limit?: number, characterId?: number, search?: string }) {
  }
}

export class SuccessCharacterEventsSearch implements Action {
  readonly type = MarvelActionTypes.SuccessCharacterEventsSearch;

  constructor(public payload: { apiResults: MarvelApiResults<MarvelComic> }) {
  }
}

export class RequestComicSeriesSearch implements Action {
  readonly type = MarvelActionTypes.RequestComicSeriesSearch;

  constructor(public payload: { offset?: number, limit?: number, characterId?: number, search?: string }) {
  }
}

export class SuccessComicSeriesSearch implements Action {
  readonly type = MarvelActionTypes.SuccessComicSeriesSearch;

  constructor(public payload: { apiResults: MarvelApiResults<MarvelComic> }) {
  }
}

export class RequestCharacterWikiUrl implements Action {
  readonly type = MarvelActionTypes.RequestCharacterWikiUrl;

  constructor(public payload: { offset?: number, limit?: number, characterId?: number, search?: string }) {

  }
}

export class SuccessCharacterWikiUrl implements Action {
  readonly type = MarvelActionTypes.SuccessCharacterWikiUrl;

  constructor(public payload: { apiResults: MarvelApiResults<MarvelCharacter> }) {
  }
}

export type MarvelActionsUnion =
  RequestCharacterList |
  SuccessCharacterList |
  RequestCharacterComicList |
  SuccessCharacterComicList |
  RequestCharacterDetail |
  SuccessCharacterDetail |
  RequestCharacterSearch |
  SuccessCharacterSearch |
  RequestComicSearch |
  SuccessComicSearch |
  RequestHttp |
  SuccessHttp |
  RequestComicSeriesList |
  SuccessComicSeriesList |
  RequestComicSeriesSearch |
  SuccessComicSeriesSearch |
  RequestComicStoriesList |
  SuccessComicStoriesList |
  RequestComicEventsList |
  SuccessComicEventsList |
  RequestCharacterEventsSearch |
  SuccessCharacterEventsSearch |
  RequestCharacterWikiUrl |
  SuccessCharacterWikiUrl ;
