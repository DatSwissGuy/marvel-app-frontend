import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoritesContainerComponent } from '../favorites-container/favorites-container.component';
import { TabTwoContainerComponent } from '../tab-two-container/tab-two-container.component';
import { Store } from '@ngrx/store';
import { getUserData } from '../../reducers';
import { Observable } from 'rxjs';
import { User } from '../../model/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  pageTitle: string;
  activeTab: string;
  user$: Observable<User>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<any>
  ) {
  }

  ngOnInit() {
    this.pageTitle = 'My Profile';
    this.route.paramMap.subscribe(queryParamMap => this.activeTab = queryParamMap.get('tab'));
    this.user$ = this.store.select(getUserData);
  }

  onTabChange(event): void {
    this.router.navigate(['profile', event]);
  }

  getComponent(): any {
    switch (this.activeTab) {
      case 'favorites':
        return FavoritesContainerComponent;

      case 'tab-two-container':
        return TabTwoContainerComponent;

      default:
        return FavoritesContainerComponent;
    }
  }

}
