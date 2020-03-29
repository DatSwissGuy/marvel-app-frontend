import { Action } from '@ngrx/store';
import { AuthToken } from '../model/auth-token';
import { User } from '../model/user';

export enum AuthActionTypes {
  RequestAccessToken = '[Auth] Request access token',
  SuccessAccessToken = '[Auth] Successfully fetched access token',
  RequestRemoveAccessToken = '[Auth] Request removal of access token',
  SuccessRemoveAccessToken = '[Auth] Successfully removed access token',
  RequestAccessTokenFromStorage = '[Auth] Request access token from storage',
  SuccessAccessTokenFromStorage = '[Auth] Success access token from storage',
  RequestUserData = '[Auth] Request user data',
  SuccessUserData = '[Auth] Successfully fetched user data',
}

export class RequestAccessToken implements Action {
  readonly type = AuthActionTypes.RequestAccessToken;

  constructor(public payload: { username: string, password: string }) {
  }
}

export class RequestAccessTokenFromStorage implements Action {
  readonly type = AuthActionTypes.RequestAccessTokenFromStorage;
}

export class SuccessAccessTokenFromStorage implements Action {
  readonly type = AuthActionTypes.SuccessAccessTokenFromStorage;

  constructor(public payload: { auth: AuthToken }) {
  }
}

export class SuccessAccessToken implements Action {
  readonly type = AuthActionTypes.SuccessAccessToken;

  constructor(public payload: { auth: AuthToken }) {
  }
}

export class RemoveAccessToken implements Action {
  readonly type = AuthActionTypes.RequestRemoveAccessToken;

  constructor(public payload: { auth: AuthToken }) {
  }
}

export class SuccessRemoveAccessToken implements Action {
  readonly type = AuthActionTypes.SuccessRemoveAccessToken;
}

export class RequestUserData implements Action {
  readonly type = AuthActionTypes.RequestUserData;
}

export class SuccessUserData implements Action {
  readonly type = AuthActionTypes.SuccessUserData;

  constructor(public payload: { user: User }) {
  }
}

export type AuthActionsUnion =
  RequestAccessToken |
  SuccessAccessToken |
  RemoveAccessToken |
  SuccessRemoveAccessToken |
  RequestAccessTokenFromStorage |
  SuccessAccessTokenFromStorage |
  RequestUserData |
  SuccessUserData ;
