import { Favorite } from '../model/favorite';
import { FavoriteActionsUnion, FavoriteActionTypes } from '../actions/favorite.actions';
import { AuthActionsUnion, AuthActionTypes } from '../actions/auth.actions';

export interface State {
  favorites: Favorite[],
  favoritesLoaded: boolean
}

export const initialState: State = {
  favorites: [],
  favoritesLoaded: false
};

export function reducer(
  state = initialState,
  action: FavoriteActionsUnion | AuthActionsUnion
): State {
  switch (action.type) {

    case FavoriteActionTypes.RequestFavorites:
      return {
        ...state,
        favorites: [],
        favoritesLoaded: false
      };

    case FavoriteActionTypes.SuccessFavorites:
      return {
        ...state,
        favorites: action.payload.favorites,
        favoritesLoaded: true
      };

    case AuthActionTypes.RequestRemoveAccessToken:
      return {
        ...state,
        favorites: [],
        favoritesLoaded: false
      };

    default:
      return state;
  }
}

export const getFavorites = (state: State) => state.favorites;

export const getFavoritesLoaded = (state: State) => state.favoritesLoaded;
