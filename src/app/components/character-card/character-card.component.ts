import { Component, Input } from '@angular/core';
import { MarvelCharacter } from '../../model/marvel-character';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent {
  @Input() character: MarvelCharacter;

  hasThumbnail() {
    return this.character.thumbnail.path.includes('image_not_available') ? false : true;
  }
}
