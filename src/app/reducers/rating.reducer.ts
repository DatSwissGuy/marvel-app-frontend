import { RatingActionsUnion, RatingActionTypes } from '../actions/rating.actions';
import { CharacterRating } from '../model/character-rating';
import { AverageCharacterRating } from '../model/average-character-rating';
import { AuthActionsUnion, AuthActionTypes } from '../actions/auth.actions';

export interface State {
  characterId: number;
  userRating: CharacterRating;
  averageRating: AverageCharacterRating;
}

const initialState: State = {
  characterId: null,
  userRating: null,
  averageRating: null
};

export function reducer(
  state: State = initialState,
  action: RatingActionsUnion | AuthActionsUnion
): State {
  switch (action.type) {

    case RatingActionTypes.RequestAverageCharacterRating:
      return {
        ...state,
        characterId: action.payload.characterId,
        averageRating: null
      };

    case RatingActionTypes.SuccessAverageCharacterRating:
      return {
        ...state,
        averageRating: action.payload.averageRating
      };

    case RatingActionTypes.RequestUpdateCharacterRating:
      return {
        ...state,
        userRating: action.payload.characterRating
      };

    case RatingActionTypes.SuccessUpdateCharacterRating:
      return {
        ...state,
      };

    case RatingActionTypes.RequestUserCharacterRating:
      return {
        ...state,
        characterId: action.payload.characterId,
        userRating: null,
      };

    case RatingActionTypes.SuccessUserCharacterRating:
      return {
        ...state,
        userRating: action.payload.characterRating
      };

    case RatingActionTypes.RequestUserCharacterVoting:
      return {
        ...state,
        characterId: action.payload.characterId
      };

    case RatingActionTypes.SuccessUserCharacterVoting:
      return {
        ...state,
        userRating: action.payload.characterRating
      };

    case RatingActionTypes.RequestDeleteUserRating:
      return {
        ...state,
      };

    case RatingActionTypes.SuccessDeleteUserRating:
      return {
        ...state,
        userRating: null
      };

    case AuthActionTypes.RequestRemoveAccessToken:
      return {
        ...state,
        userRating: null
      };

    default:
      return state;
  }
}

export const getAverageCharacterRating = (state: State) => state.averageRating;

export const getUserCharacterRating = (state: State) => state.userRating;
