import { Component, Input } from '@angular/core';
import { MarvelComic } from '../../model/marvel-comic';

@Component({
  selector: 'app-comic-events-list',
  templateUrl: './comic-events-list.component.html',
  styleUrls: ['./comic-events-list.component.scss']
})
export class ComicEventsListComponent {
  @Input() events: MarvelComic[];
}
