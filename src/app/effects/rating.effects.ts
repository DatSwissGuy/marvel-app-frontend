import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RatingActions } from '../actions';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RatingService } from '../services/rating.service';
import { getAverageCharacterRating, getUserCharacterRating } from '../reducers';
import {
  RequestAverageCharacterRating,
  SuccessAverageCharacterRating,
  SuccessDeleteUserRating,
  SuccessUpdateCharacterRating,
  SuccessUserCharacterRating,
  SuccessUserCharacterVoting
} from '../actions/rating.actions';


@Injectable()
export class RatingEffects {
  constructor(
    private actions$: Actions<RatingActions.RatingActionsUnion>,
    private ratingService: RatingService,
    private store: Store<any>,
  ) {
  }

  @Effect()
  requestAverageCharacterRating$ = this.actions$.pipe(
    ofType(RatingActions.RatingActionTypes.RequestAverageCharacterRating),
    withLatestFrom(this.store.select(getAverageCharacterRating)),
    switchMap(([action]) => this.ratingService.getAverageCharacterRating(
      action.payload.characterId
      ).pipe(
      map(rating => new SuccessAverageCharacterRating({
        averageRating: rating.data
      }))
      )
    )
  );

  @Effect()
  requestUserCharacterRating$ = this.actions$.pipe(
    ofType(RatingActions.RatingActionTypes.RequestUserCharacterRating),
    switchMap(action => this.ratingService.getUserCharacterRating(
      action.payload.characterId
    ).pipe(
      map(rating => new SuccessUserCharacterRating({
          characterRating: rating && rating.data ? rating.data : null
        }
      ))
    ))
  );

  @Effect()
  requestUserVoting$ = this.actions$.pipe(
    ofType(RatingActions.RatingActionTypes.RequestUserCharacterVoting),
    withLatestFrom(this.store.select(getUserCharacterRating)),
    switchMap(([action]) => this.ratingService.postUserCharacterRating(
      action.payload.characterId,
      action.payload.rating
    ).pipe(
      map(data => {
        this.store.dispatch(new RequestAverageCharacterRating({
          characterId: data.data.character_id
        }));
        return new SuccessUserCharacterVoting({
          characterRating: data.data
        });
      })
    ))
  );

  @Effect()
  requestUpdateUserVoting$ = this.actions$.pipe(
    ofType(RatingActions.RatingActionTypes.RequestUpdateCharacterRating),
    withLatestFrom(this.store.select(getUserCharacterRating)),
    switchMap(([action]) => this.ratingService.updateUserCharacterRating(
      action.payload.characterRating.id,
      action.payload.characterRating.rating
    ).pipe(
      map(data => {
        this.store.dispatch(new RequestAverageCharacterRating({
          characterId: data.data.character_id
        }));
        return new SuccessUpdateCharacterRating({
          characterRating: data.data
        });
      })
    ))
  );

  @Effect()
  requestDeleteUserRating$ = this.actions$.pipe(
    ofType(RatingActions.RatingActionTypes.RequestDeleteUserRating),
    withLatestFrom(this.store.select(getUserCharacterRating)),
    switchMap(([action]) => this.ratingService.deleteUserCharacterRating(
      action.payload.characterRating.id
    ).pipe(
      map(() => {
        this.store.dispatch(new RequestAverageCharacterRating({
          characterId: action.payload.characterRating.character_id
        }));
        return new SuccessDeleteUserRating();
      })
    ))
  );
}
