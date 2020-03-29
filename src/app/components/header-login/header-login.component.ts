import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RemoveAccessToken } from '../../actions/auth.actions';
import { getAuthToken, getIsAuthenticated } from '../../reducers';
import { Observable } from 'rxjs';
import { AuthToken } from '../../model/auth-token';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss']
})

export class HeaderLoginComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  accessToken: AuthToken;

  constructor(
    private router: Router,
    private store: Store<any>,
  ) {
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(getIsAuthenticated);
    this.store.select(getAuthToken).subscribe(
      token => this.accessToken = token
    );
  }

  logOut(): void {
    this.store.dispatch(new RemoveAccessToken({
      auth: this.accessToken
    }));
  }
}
