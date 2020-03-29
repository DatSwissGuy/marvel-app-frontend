import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import { map, switchMap } from 'rxjs/operators';
import { RequestUserData, SuccessUserData } from '../actions/auth.actions';
import { AuthActions } from '../actions';


@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions<AuthActions.AuthActionsUnion>,
    private userService: UserService,
  ) {
  }

  @Effect()
  requestUserData$ = this.actions$.pipe(
    ofType<RequestUserData>(AuthActions.AuthActionTypes.RequestUserData),
    switchMap(() => this.userService.getCurrentUser()
      .pipe(
        map(user => {
          return new SuccessUserData({
            user: user.data
          });
        }))
    ));
}
