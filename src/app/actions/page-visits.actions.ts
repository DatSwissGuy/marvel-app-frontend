import { Action } from '@ngrx/store';
import { PageVisits } from '../model/page-visits';


export enum PageVisitsActionTypes {
  RequestPageVisits = '[Page-Visits] Request page visits for character',
  SuccessPageVisits = '[Page-Visits] Successfully fetched page visits for character'
}

export class RequestPageVisits implements Action {
  readonly type = PageVisitsActionTypes.RequestPageVisits;

  constructor(public payload: { characterId: number }) {
  }
}

export class SuccessPageVisits implements Action {
  readonly type = PageVisitsActionTypes.SuccessPageVisits;

  constructor(public payload: { pageVisits: PageVisits }) {
  }
}

export type PageVisitsActionsUnion =
  RequestPageVisits |
  SuccessPageVisits ;
