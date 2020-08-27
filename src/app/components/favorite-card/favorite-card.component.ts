import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Favorite } from '../../model/favorite';


@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent {
  @Input() favorite: Favorite;

  @Output() deleteFavorite = new EventEmitter();

  hasThumbnail() {
    return !this.favorite.image_url.includes('image_not_available');
  }

  deleteFromFavorites() {
    this.deleteFavorite.emit(this.favorite.id);
  }

}
