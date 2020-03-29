import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { AuthActions } from '../actions';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import {
  RequestAccessToken,
  RequestAccessTokenFromStorage,
  RequestUserData,
  SuccessAccessToken,
  SuccessAccessTokenFromStorage,
  SuccessRemoveAccessToken
} from '../actions/auth.actions';
import { Store } from '@ngrx/store';
import { getAuthToken } from '../reducers';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<AuthActions.AuthActionsUnion>,
    private authService: AuthService,
    private userService: UserService,
    private store: Store<any>,
    private router: Router
  ) {
  }

  @Effect()
  init$ = this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => {
      return new RequestAccessTokenFromStorage();
    })
  );

  @Effect({dispatch: false})
  requestAccessTokenFromStorage$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.RequestAccessTokenFromStorage),
    map(() => {
      return this.store.dispatch(new SuccessAccessTokenFromStorage({
        auth: JSON.parse(localStorage.getItem('token'))
      }));
      }
    ));

  @Effect({dispatch: false})
  successAccessTokenFromStorage$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.SuccessAccessTokenFromStorage),
    map(() => {
      return this.store.select(getAuthToken).subscribe(
        token => {
          if (token !== null) {
            return this.store.dispatch(new RequestUserData());
          }
        }
      );
    })
  );

  @Effect()
  requestAccessToken$ = this.actions$.pipe(
    ofType<RequestAccessToken>(AuthActions.AuthActionTypes.RequestAccessToken),
    withLatestFrom(this.store.select(getAuthToken)),
    switchMap(([action]) => this.authService.getAccessTokenByLogin(
      action.payload.username,
      action.payload.password
    ).pipe(
      map(authToken => {
        this.store.dispatch(new SuccessAccessToken({
          auth: authToken
        }));
        localStorage.setItem('token', JSON.stringify(authToken));
        return new RequestUserData();
      })
    ))
  );

  @Effect({dispatch: false})
  successAccessToken$ = this.actions$.pipe(
    ofType<SuccessAccessToken>(AuthActions.AuthActionTypes.SuccessAccessToken),
    map(() => {
      return this.router.navigate(['/']);
    })
  );

  @Effect()
  removeAccessToken$ = this.actions$.pipe(
    ofType<RequestAccessToken>(AuthActions.AuthActionTypes.RequestRemoveAccessToken),
    withLatestFrom(this.store.select(getAuthToken)),
    switchMap(() => {
      localStorage.removeItem('token');
      return this.authService.logoutFromBackend();
    }),
    map(() => {
      return new SuccessRemoveAccessToken();
    })
  );
}

