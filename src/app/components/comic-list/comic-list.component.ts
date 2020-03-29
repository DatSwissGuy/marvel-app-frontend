import { Component, Input } from '@angular/core';
import { MarvelComic } from '../../model/marvel-comic';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.scss']
})
export class ComicListComponent {
  @Input() comics: MarvelComic[];
}
