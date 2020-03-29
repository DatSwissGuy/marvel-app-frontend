import { Component, Input } from '@angular/core';
import { MarvelComic } from '../../model/marvel-comic';

@Component({
  selector: 'app-comic-series-list',
  templateUrl: './comic-series-list.component.html',
  styleUrls: ['./comic-series-list.component.scss']
})
export class ComicSeriesListComponent {
  @Input() series: MarvelComic[];
}
