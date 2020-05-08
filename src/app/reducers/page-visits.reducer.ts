import { PageVisits } from '../model/page-visits';
import { PageVisitsActionsUnion, PageVisitsActionTypes } from '../actions/page-visits.actions';

export interface State {
  pageVisits: PageVisits
}

const initialState: State = {
  pageVisits: null
};

export function reducer(
  state = initialState,
  action: PageVisitsActionsUnion
): State {
  switch (action.type) {

    case PageVisitsActionTypes.RequestPageVisits:
      return {
        ...state,
        pageVisits: null
      };

    case PageVisitsActionTypes.SuccessPageVisits:
      return {
        ...state,
        pageVisits: action.payload.pageVisits
      };

    default:
      return state;
  }
}

export const getPageVisits = (state: State) => state.pageVisits;
