import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import * as fromMarvel from './marvel.reducer';
import * as fromAuth from './auth.reducer';
import * as fromRating from './rating.reducer';
import * as fromPageVisit from './page-visits.reducer';
import * as fromFavorite from './favorite.reducer';
import { Favorite } from '../model/favorite';
import { MarvelCharacter } from '../model/marvel-character';

export interface State {
  router: fromRouter.RouterReducerState;
  marvel: fromMarvel.State;
  auth: fromAuth.State;
  rating: fromRating.State;
  pageVisits: fromPageVisit.State;
  favorite: fromFavorite.State;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  marvel: fromMarvel.reducer,
  auth: fromAuth.reducer,
  rating: fromRating.reducer,
  pageVisits: fromPageVisit.reducer,
  favorite: fromFavorite.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectMarvelState = createFeatureSelector<State, fromMarvel.State>('marvel');

export const selectAuthState = createFeatureSelector<State, fromAuth.State>('auth');

export const selectRatingState = createFeatureSelector<State, fromRating.State>('rating');

export const selectPageVisitState = createFeatureSelector<State, fromPageVisit.State>('pageVisits');

export const selectFavorite = createFeatureSelector<State, fromFavorite.State>('favorite');

export const getCharacterApiResults = createSelector(
  selectMarvelState,
  fromMarvel.getCharacterApiResults
);

export const getCharacterComicApiResults = createSelector(
  selectMarvelState,
  fromMarvel.getCharacterComicApiResults
);

export const getCharacterDetailApiResults = createSelector(
  selectMarvelState,
  fromMarvel.getCharacterDetailApiResults
);

export const getCharacterSearchApiResults = createSelector(
  selectMarvelState,
  fromMarvel.getCharacterSearchApiResults
);

export const getComicSearchApiResults = createSelector(
  selectMarvelState,
  fromMarvel.getComicSearchApiResults
);

export const getCharacterHeaderImage = createSelector(
  getCharacterDetailApiResults,
  fromMarvel.getCharacterHeaderImage
);

export const getLoadingState = createSelector(
  selectMarvelState,
  fromMarvel.getLoadingState
);

export const getHasComics = createSelector(
  getCharacterDetailApiResults,
  fromMarvel.getHasComics
);

export const getHasSeries = createSelector(
  getCharacterDetailApiResults,
  fromMarvel.getHasSeries
);

export const getHasStories = createSelector(
  getCharacterDetailApiResults,
  fromMarvel.getHasStories
);

export const getHasEvents = createSelector(
  getCharacterDetailApiResults,
  fromMarvel.getHasEvents
);

export const getCharacterWikiUrl = createSelector(
  getCharacterDetailApiResults,
  fromMarvel.getCharacterWikiUrl
);

export const getCharacterComicSeriesApiResults = createSelector(
  selectMarvelState,
  fromMarvel.getCharacterComicSeriesApiResults
);

export const getComicSeriesSearchResults = createSelector(
  selectMarvelState,
  fromMarvel.getComicSeriesSearchApiResults
);

export const getComicStoriesApiResults = createSelector(
  selectMarvelState,
  fromMarvel.getCharacterComicStoriesApiResults
);

export const getComicEventsApiResults = createSelector(
  selectMarvelState,
  fromMarvel.getCharacterComicEventsApiResults
);

export const getCharacterEventsSearchResults = createSelector(
  selectMarvelState,
  fromMarvel.getCharacterEventsSearchApiResults
);

export const getAuthToken = createSelector(
  selectAuthState,
  fromAuth.getAuthToken
);

export const getUserData = createSelector(
  selectAuthState,
  fromAuth.getUserData
);

export const getIsAuthenticated = createSelector(
  selectAuthState,
  fromAuth.getIsAuthenticated
);

export const getAverageCharacterRating = createSelector(
  selectRatingState,
  fromRating.getAverageCharacterRating
);

export const getUserCharacterRating = createSelector(
  selectRatingState,
  fromRating.getUserCharacterRating
);

export const getPageVisits = createSelector(
  selectPageVisitState,
  fromPageVisit.getPageVisits
);

export const getFavorites = createSelector(
  selectFavorite,
  fromFavorite.getFavorites
);

export const getIsFavorite = createSelector(
  getFavorites,
  getCharacterDetailApiResults,
  (favorites: Favorite[], currentCharacter: MarvelCharacter) => {
    if (currentCharacter) {
      return favorites.some(
        value => value.character_id === currentCharacter.id
      );
    }
    return false;
  }
);

// TODO edge cases?
export const getFavoriteId = createSelector(
  getFavorites,
  getCharacterDetailApiResults,
  (favorites: Favorite[], currentCharacter: MarvelCharacter) => {
    if (currentCharacter) {
      const currentFavorite = favorites.find(value => value.character_id === currentCharacter.id);
      if (currentFavorite) {
        return currentFavorite.id;
      }
    }
    return -1;
  }
);

export const getIsFavoritesLoaded = createSelector(
  selectFavorite,
  fromFavorite.getFavoritesLoaded
);

