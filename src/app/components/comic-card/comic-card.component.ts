import { Component, Input } from '@angular/core';
import { MarvelComic } from '../../model/marvel-comic';

@Component({
  selector: 'app-comic-card',
  templateUrl: './comic-card.component.html',
  styleUrls: ['./comic-card.component.scss']
})
export class ComicCardComponent {
  @Input() comic: MarvelComic;
}
