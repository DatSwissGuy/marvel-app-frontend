import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {

  @Input() isFavorite: boolean;
  @Input() isFavoritesLoaded: boolean;

  @Output() addFavorite = new EventEmitter();
  @Output() deleteFavorite = new EventEmitter();

  addToFavorites() {
    this.addFavorite.emit();
  }

  deleteFromFavorites() {
    this.deleteFavorite.emit();
  }

}
