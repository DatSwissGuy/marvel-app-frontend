import { Component, Input } from '@angular/core';
import { MarvelComic } from '../../model/marvel-comic';

@Component({
  selector: 'app-comic-stories-list',
  templateUrl: './comic-stories-list.component.html',
  styleUrls: ['./comic-stories-list.component.scss']
})
export class ComicStoriesListComponent {
  @Input() stories: MarvelComic[];
}
