import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getIsAuthenticated } from '../reducers';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileGuardService implements CanActivate {
  isAuthenticated: boolean;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<any>
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    this.store.select(getIsAuthenticated).subscribe(data => this.isAuthenticated = data);
    if (this.isAuthenticated) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
