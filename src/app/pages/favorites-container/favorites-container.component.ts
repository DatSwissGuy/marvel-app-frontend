import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getFavorites } from '../../reducers';
import { Favorite } from '../../model/favorite';
import { RequestDeleteFavorite } from '../../actions/favorite.actions';

@Component({
  selector: 'app-favorites-container',
  templateUrl: './favorites-container.component.html',
  styleUrls: ['./favorites-container.component.scss']
})
export class FavoritesContainerComponent implements OnInit {
  favorites$: Observable<Favorite[]>;

  constructor(
    private store: Store<any>
  ) {
  }

  ngOnInit(): void {
    this.favorites$ = this.store.select(getFavorites);
  }

  deleteFromFavorites(event): void {
    this.store.dispatch(new RequestDeleteFavorite({
      favoriteId: event
    }));
  }

}
