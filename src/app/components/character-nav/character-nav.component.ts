import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-character-nav',
  templateUrl: './character-nav.component.html',
  styleUrls: ['./character-nav.component.scss']
})
export class CharacterNavComponent {
  @Input() hasComics: boolean;
  @Input() hasSeries: boolean;
  @Input() hasStories: boolean;
  @Input() hasEvents: boolean;
  @Input() activeTab: string;

  @Output() tab = new EventEmitter();

  onTabClick(name: string) {
    this.tab.emit(name);
  }

}
