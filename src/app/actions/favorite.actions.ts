import { Action } from '@ngrx/store';
import { Favorite } from '../model/favorite';

export enum FavoriteActionTypes {
  RequestFavorites = '[Favorites] Request favorites',
  SuccessFavorites = '[Favorites] Successfully fetched favorites',
  RequestAddFavorite = '[Favorites] Request add to favorites',
  SuccessAddFavorite = '[Favorites] Successfully added character to favorites',
  RequestDeleteFavorite = '[Favorites] Request deletion of favorite',
  SuccessDeleteFavorite = '[Favorites] Successfully deleted character from favorites'
}

// GET
export class RequestFavorites implements Action {
  readonly type = FavoriteActionTypes.RequestFavorites;
}

export class SuccessFavorites implements Action {
  readonly type = FavoriteActionTypes.SuccessFavorites;

  constructor(public payload: { favorites: Favorite[] }) {
  }
}

// POST
export class RequestAddFavorite implements Action {
  readonly type = FavoriteActionTypes.RequestAddFavorite;

  constructor(public payload: { characterId: number, characterName: string, imageUrl: string }) {
  }
}

export class SuccessAddFavorite implements Action {
  readonly type = FavoriteActionTypes.SuccessAddFavorite;

  constructor(public payload: { favorites: Favorite }) {
  }
}

// DELETE
export class RequestDeleteFavorite implements Action {
  readonly type = FavoriteActionTypes.RequestDeleteFavorite;

  constructor(public payload: { favoriteId: number }) {
  }
}

export class SuccessDeleteFavorite implements Action {
  readonly type = FavoriteActionTypes.SuccessDeleteFavorite;
}


export type FavoriteActionsUnion =
  RequestFavorites |
  SuccessFavorites |
  RequestAddFavorite |
  SuccessAddFavorite |
  RequestDeleteFavorite |
  SuccessDeleteFavorite ;
