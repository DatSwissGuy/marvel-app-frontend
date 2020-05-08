import { AuthToken } from '../model/auth-token';
import { AuthActionsUnion, AuthActionTypes } from '../actions/auth.actions';
import { User } from '../model/user';

export interface State {
  authToken: AuthToken;
  isAuthenticated: boolean;
  user: User;
}

const initialState: State = {
  authToken: null,
  isAuthenticated: false,
  user: null
};

export function reducer(
  state: State = initialState,
  action: AuthActionsUnion
): State {
  switch (action.type) {

    case AuthActionTypes.SuccessAccessToken:
      return {
        ...state,
        authToken: action.payload.auth,
        isAuthenticated: true
      };

    case AuthActionTypes.SuccessAccessTokenFromStorage:
      if (action.payload.auth === null) {
        return state;
      }
      return {
        ...state,
        authToken: action.payload.auth,
        isAuthenticated: true
      };

    case AuthActionTypes.RequestAccessToken:
      if (state.authToken !== null) {
        return state;
      }
      return {
        ...state,
        authToken: null,
        isAuthenticated: false
      };

    case AuthActionTypes.SuccessRemoveAccessToken:
      return {
        ...state,
        authToken: null,
        user: null
      };

    case AuthActionTypes.RequestRemoveAccessToken:
      return {
        ...state,
        isAuthenticated: false,
      };

    case AuthActionTypes.RequestUserData:
      return {
        ...state,
      };

    case AuthActionTypes.SuccessUserData:
      return {
        ...state,
        user: action.payload.user
      };

    default:
      return state;
  }
}

export const getAuthToken = (state: State) => state.authToken;

export const getIsAuthenticated = (state: State) => state.isAuthenticated;

export const getUserData = (state: State) => state.user;
