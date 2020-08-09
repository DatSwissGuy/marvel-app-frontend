import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActions, FavoriteActions } from '../actions';
import { filter, map, switchMap } from 'rxjs/operators';
import {
  RequestAddFavorite,
  RequestDeleteFavorite,
  RequestFavorites,
  SuccessAddFavorite,
  SuccessDeleteFavorite,
  SuccessFavorites
} from '../actions/favorite.actions';
import { FavoriteService } from '../services/favorite.service';

@Injectable()
export class FavoriteEffects {
  constructor(
    private actions$: Actions<FavoriteActions.FavoriteActionsUnion | AuthActions.AuthActionsUnion>,
    private favoriteService: FavoriteService,
  ) {
  }

  @Effect()
  requestFavoritesOnUpdate$ = this.actions$.pipe(
    ofType(
      FavoriteActions.FavoriteActionTypes.SuccessAddFavorite,
      FavoriteActions.FavoriteActionTypes.SuccessDeleteFavorite
    ),
    map(() => new RequestFavorites())
  );

  @Effect()
  requestFavoritesOnLogin$ = this.actions$.pipe(
    ofType(
      AuthActions.AuthActionTypes.SuccessAccessTokenFromStorage,
      AuthActions.AuthActionTypes.SuccessAccessToken
    ),
    filter(action => action.payload.auth !== null),
    map(() => new RequestFavorites())
  );

  @Effect()
  successFavorites$ = this.actions$.pipe(
    ofType<RequestFavorites>(FavoriteActions.FavoriteActionTypes.RequestFavorites),
    switchMap(() => {
      return this.favoriteService.getUserFavorites();
    })
  ).pipe(
    map(favorites => new SuccessFavorites({
      favorites: favorites.data
    }))
  );

  @Effect()
  requestAddFavorites$ = this.actions$.pipe(
    ofType<RequestAddFavorite>(FavoriteActions.FavoriteActionTypes.RequestAddFavorite),
    switchMap(action => {
      return this.favoriteService.postUserFavorite(
        action.payload.characterId,
        action.payload.characterName,
        action.payload.imageUrl
      ).pipe(
        map(favorite => new SuccessAddFavorite({
            favorites: favorite.data
          })
        ));
    })
  );

  @Effect()
  requestDeleteFavorite$ = this.actions$.pipe(
    ofType<RequestDeleteFavorite>(FavoriteActions.FavoriteActionTypes.RequestDeleteFavorite),
    switchMap(action => {
      return this.favoriteService.deleteUserFavorite(
        action.payload.favoriteId
      ).pipe(
        map(() => new SuccessDeleteFavorite())
      );
    })
  );
}
