import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Favorite } from '../../model/favorite';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent {
  @Input() favorites: Favorite[];

  @Output() deleteFavorite = new EventEmitter();

  deleteFromFavorites(event) {
    this.deleteFavorite.emit(event);
  }
}
