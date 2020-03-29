import { Component, Input } from '@angular/core';
import { MarvelCharacter } from '../../model/marvel-character';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent {
  @Input() characters: MarvelCharacter[];
}
