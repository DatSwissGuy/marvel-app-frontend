import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-profile-nav',
  templateUrl: './user-profile-nav.component.html',
  styleUrls: ['./user-profile-nav.component.scss']
})
export class UserProfileNavComponent {
  @Input() activeTab: string;

  @Output() tab = new EventEmitter();

  onTabClick(name: string) {
    this.tab.emit(name);
  }

}
