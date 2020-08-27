import { AfterContentChecked, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { getLoadingState } from './reducers';
import { Observable } from 'rxjs';
import { RequestAccessTokenFromStorage } from './actions/auth.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentChecked {

  constructor(
    private store: Store<any>,
    private changeDetector: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
  }

  isLoading$: Observable<boolean>;

  ngOnInit() {
    this.isLoading$ = this.store.select(getLoadingState);
    if (this.platformId === 'browser') {
      this.store.dispatch(new RequestAccessTokenFromStorage())
    }
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
