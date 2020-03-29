import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getLoadingState } from './reducers';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentChecked {

  isLoading$: Observable<boolean>;

  constructor(
    private store: Store<any>,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(getLoadingState);
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
