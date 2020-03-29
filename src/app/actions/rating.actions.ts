import { Action } from '@ngrx/store';
import { CharacterRating } from '../model/character-rating';
import { AverageCharacterRating } from '../model/average-character-rating';

export enum RatingActionTypes {
  RequestAverageCharacterRating = '[Character-Ratings] Request average rating for character',
  SuccessAverageCharacterRating = '[Character-Ratings] Successfully fetched average rating for character',
  RequestUpdateCharacterRating = '[Character-Ratings] Update rating for character',
  SuccessUpdateCharacterRating = '[Character-Ratings] Successfully updated character rating',
  RequestUserCharacterRating = '[Character-Ratings] Request character rating from user',
  SuccessUserCharacterRating = '[Character-Ratings] Successfully fetched character rating for user',
  RequestUserCharacterVoting = '[Character-Ratings] Request vote from user',
  SuccessUserCharacterVoting = '[Character-Ratings] Successfully sent vote to backend',
  RequestDeleteUserRating = '[Character-Ratings] Request delete of user rating',
  SuccessDeleteUserRating = '[Character-Ratings] Successfully deleted user rating'
}

// GET
export class RequestAverageCharacterRating implements Action {
  readonly type = RatingActionTypes.RequestAverageCharacterRating;

  constructor(public payload: { characterId: number }) {
  }
}

export class SuccessAverageCharacterRating implements Action {
  readonly type = RatingActionTypes.SuccessAverageCharacterRating;

  constructor(public payload: { averageRating: AverageCharacterRating }) {
  }
}


// GET
export class RequestUserCharacterRating implements Action {
  readonly type = RatingActionTypes.RequestUserCharacterRating;

  constructor(public payload: { characterId: number }) {
  }
}

export class SuccessUserCharacterRating implements Action {
  readonly type = RatingActionTypes.SuccessUserCharacterRating;

  constructor(public payload: { characterRating: CharacterRating }) {
  }
}


// POST
export class RequestUserCharacterVoting implements Action {
  readonly type = RatingActionTypes.RequestUserCharacterVoting;

  constructor(public payload: { characterId: number, rating: number }) {
  }
}

export class SuccessUserCharacterVoting implements Action {
  readonly type = RatingActionTypes.SuccessUserCharacterVoting;

  constructor(public payload: { characterRating: CharacterRating }) {
  }
}


// PUT
export class RequestUpdateCharacterRating implements Action {
  readonly type = RatingActionTypes.RequestUpdateCharacterRating;

  constructor(public payload: { characterRating: CharacterRating }) {
  }
}

export class SuccessUpdateCharacterRating implements Action {
  readonly type = RatingActionTypes.SuccessUpdateCharacterRating;

  constructor(public payload: { characterRating: CharacterRating }) {
  }
}


// DELETE
export class RequestDeleteUserRating implements Action {
  readonly type = RatingActionTypes.RequestDeleteUserRating;

  constructor(public payload: { characterRating: CharacterRating }) {
  }
}

export class SuccessDeleteUserRating implements Action {
  readonly type = RatingActionTypes.SuccessDeleteUserRating;

  constructor() {
  }
}

export type RatingActionsUnion =
  RequestAverageCharacterRating |
  SuccessAverageCharacterRating |
  RequestUpdateCharacterRating |
  SuccessUpdateCharacterRating |
  RequestUserCharacterRating |
  SuccessUserCharacterRating |
  RequestUserCharacterVoting |
  SuccessUserCharacterVoting |
  RequestDeleteUserRating |
  SuccessDeleteUserRating ;
