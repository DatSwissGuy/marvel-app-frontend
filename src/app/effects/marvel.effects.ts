import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MarvelActions } from '../actions';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MarvelApiService } from '../services/marvel-api.service';
import {
  RequestCharacterComicList,
  RequestCharacterEventsSearch,
  RequestCharacterList,
  RequestCharacterSearch,
  RequestComicEventsList,
  RequestComicSearch,
  RequestComicSeriesList,
  RequestComicSeriesSearch,
  RequestComicStoriesList,
  SuccessCharacterComicList,
  SuccessCharacterDetail,
  SuccessCharacterEventsSearch,
  SuccessCharacterList,
  SuccessCharacterSearch,
  SuccessComicEventsList,
  SuccessComicSearch,
  SuccessComicSeriesList,
  SuccessComicSeriesSearch,
  SuccessComicStoriesList
} from '../actions/marvel.actions';
import { Store } from '@ngrx/store';
import {
  getCharacterApiResults,
  getCharacterComicApiResults,
  getCharacterComicSeriesApiResults,
  getCharacterDetailApiResults,
  getComicEventsApiResults,
  getComicStoriesApiResults
} from '../reducers';


@Injectable()
export class MarvelEffects {
  constructor(
    private actions$: Actions<MarvelActions.MarvelActionsUnion>,
    private apiService: MarvelApiService,
    private store: Store<any>
  ) {
  }

  @Effect()
  requestCharacterList$ = this.actions$.pipe(
    ofType(MarvelActions.MarvelActionTypes.RequestCharacterList),
    withLatestFrom(this.store.select(getCharacterApiResults)),
    filter(([action, characters]) =>
      characters === null || (action.payload.offset !== characters.offset) && (action.payload.limit !== characters.limit)),
    switchMap(([action]) => {
      return this.apiService.getCharacters(
        action.payload.offset,
        action.payload.limit,
        action.payload.search
      ).pipe(
        map(data => {
          if (data.offset <= data.total) {
            return new SuccessCharacterList({apiResults: data});
          }
          return new RequestCharacterList({
            offset: Math.floor(data.total / data.limit) * data.limit,
            limit: data.limit,
            search: action.payload.search
          });
        })
      );
    })
  );

  @Effect()
  requestCharacterSearch$ = this.actions$.pipe(
    ofType(MarvelActions.MarvelActionTypes.RequestCharacterSearch),
    switchMap((action) => {
      return this.apiService.getCharacters(
        action.payload.offset,
        action.payload.limit,
        action.payload.search
      ).pipe(
        map(data => {
          if (data.offset <= data.total) {
            return new SuccessCharacterSearch({apiResults: data});
          }
          return new RequestCharacterSearch({
            offset: Math.floor(data.total / data.limit) * data.limit,
            limit: data.limit,
            search: action.payload.search
          });
        })
      );
    })
  );

  @Effect()
  requestComicList$ = this.actions$.pipe(
    ofType(MarvelActions.MarvelActionTypes.RequestComicList),
    withLatestFrom(
      this.store.select(getCharacterComicApiResults),
      this.store.select(getCharacterDetailApiResults)
    ),
    filter(([action, comics, character]) => character === null ||
      character.id !== action.payload.characterId ||
      comics === null ||
      (action.payload.offset !== comics.offset) && (action.payload.limit !== comics.limit)
    ),
    switchMap(([action]) => {
      return this.apiService.getCharacterComics(
        action.payload.offset,
        action.payload.limit,
        action.payload.characterId,
        action.payload.search
      ).pipe(
        map(data => {
          if (data.offset <= data.total) {
            return new SuccessCharacterComicList({apiResults: data});
          }
          return new RequestCharacterComicList({
            offset: Math.floor(data.total / data.limit) * data.limit,
            limit: data.limit,
            characterId: action.payload.characterId,
            search: action.payload.search
          });
        })
      );
    })
  );

  @Effect()
  requestComicSeriesList$ = this.actions$.pipe(
    ofType(MarvelActions.MarvelActionTypes.RequestComicSeriesList),
    withLatestFrom(
      this.store.select(getCharacterComicSeriesApiResults),
      this.store.select(getCharacterDetailApiResults)
    ),
    filter(([action, series, character]) => character === null ||
      character.id !== action.payload.characterId ||
      series === null ||
      (action.payload.offset !== series.offset) && (action.payload.limit !== series.limit)
    ),
    switchMap(([action]) => {
      return this.apiService.getCharacterSeries(
        action.payload.offset,
        action.payload.limit,
        action.payload.characterId,
        action.payload.search
      ).pipe(
        map(data => {
          if (data.offset <= data.total) {
            return new SuccessComicSeriesList({apiResults: data});
          }
          return new RequestComicSeriesList({
            offset: Math.floor(data.total / data.limit) * data.limit,
            limit: data.limit,
            characterId: action.payload.characterId,
            search: action.payload.search
          });
        })
      );
    })
  );

  @Effect()
  requestComicStoriesList$ = this.actions$.pipe(
    ofType(MarvelActions.MarvelActionTypes.RequestComicStoriesList),
    withLatestFrom(
      this.store.select(getComicStoriesApiResults),
      this.store.select(getCharacterDetailApiResults)
    ),
    filter(([action, stories, character]) => character === null ||
      character.id !== action.payload.characterId ||
      stories === null ||
      (action.payload.offset !== stories.offset) && (action.payload.limit !== stories.limit)
    ),
    switchMap(([action]) => {
      return this.apiService.getCharacterStories(
        action.payload.offset,
        action.payload.limit,
        action.payload.characterId
      ).pipe(
        map(data => {
          if (data.offset <= data.total) {
            return new SuccessComicStoriesList({apiResults: data});
          }
          return new RequestComicStoriesList({
            offset: Math.floor(data.total / data.limit) * data.limit,
            limit: data.limit,
            characterId: action.payload.characterId,
            search: action.payload.search
          });
        })
      );
    })
  );

  @Effect()
  requestComicEventsList$ = this.actions$.pipe(
    ofType(MarvelActions.MarvelActionTypes.RequestComicEventsList),
    withLatestFrom(
      this.store.select(getComicEventsApiResults),
      this.store.select(getCharacterDetailApiResults)
    ),
    filter(([action, events, character]) => character === null ||
      character.id !== action.payload.characterId ||
      events === null ||
      (action.payload.offset !== events.offset) && (action.payload.limit !== events.limit)
    ),
    switchMap(([action]) => {
      return this.apiService.getCharacterEvents(
        action.payload.offset,
        action.payload.limit,
        action.payload.characterId,
        action.payload.search
      ).pipe(
        map(data => {
          if (data.offset <= data.total) {
            return new SuccessComicEventsList({apiResults: data});
          }
          return new RequestComicEventsList({
            offset: Math.floor(data.total / data.limit) * data.limit,
            limit: data.limit,
            characterId: action.payload.characterId,
            search: action.payload.search
          });
        })
      );
    })
  );

  @Effect()
  requestComicSearch$ = this.actions$.pipe(
    ofType(MarvelActions.MarvelActionTypes.RequestComicSearch),
    switchMap(action => {
      return this.apiService.getCharacterComics(
        action.payload.offset,
        action.payload.limit,
        action.payload.characterId,
        action.payload.search
      ).pipe(
        map(data => {
          if (data.offset <= data.total) {
            return new SuccessComicSearch({apiResults: data});
          }
          return new RequestComicSearch({
            offset: Math.floor(data.total / data.limit) * data.limit,
            limit: data.limit,
            search: action.payload.search
          });
        })
      );
    })
  );

  @Effect()
  requestComicSeriesSearch$ = this.actions$.pipe(
    ofType(MarvelActions.MarvelActionTypes.RequestComicSeriesSearch),
    switchMap(action => {
      return this.apiService.getCharacterSeries(
        action.payload.offset,
        action.payload.limit,
        action.payload.characterId,
        action.payload.search
      ).pipe(
        map(data => {
          if (data.offset <= data.total) {
            return new SuccessComicSeriesSearch({apiResults: data});
          }
          return new RequestComicSeriesSearch({
            offset: Math.floor(data.total / data.limit) * data.limit,
            limit: data.limit,
            search: action.payload.search
          });
        })
      );
    })
  );

  @Effect()
  requestCharacterEventsSearch$ = this.actions$.pipe(
    ofType(MarvelActions.MarvelActionTypes.RequestCharacterEventsSearch),
    switchMap(action => {
      return this.apiService.getCharacterEvents(
        action.payload.offset,
        action.payload.limit,
        action.payload.characterId,
        action.payload.search
      ).pipe(
        map(data => {
          if (data.offset <= data.total) {
            return new SuccessCharacterEventsSearch({apiResults: data});
          }
          return new RequestCharacterEventsSearch({
            offset: Math.floor(data.total / data.limit) * data.limit,
            limit: data.limit,
            search: action.payload.search
          });
        })
      );
    })
  );

  @Effect()
  requestCharacterDetail$ = this.actions$.pipe(
    ofType(MarvelActions.MarvelActionTypes.RequestCharacterDetail),
    withLatestFrom(this.store.select(getCharacterDetailApiResults)),
    filter(([action, character]) => character === null || action.payload.characterId !== character.id),
    switchMap(([action]) => {
      return this.apiService.getCharacterDetail(
        action.payload.characterId
      ).pipe(
        map(data => new SuccessCharacterDetail({apiResults: data}))
      );
    })
  );

}

