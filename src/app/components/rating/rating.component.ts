import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {

  @Input() averageRating: number;
  @Input() userRating: number;
  @Input() isLoggedIn: boolean;
  @Output() voting = new EventEmitter();
  @Output() deleteVoting = new EventEmitter();

  vote(amount: number) {
    this.voting.emit(amount);
  }

  deleteRating() {
    this.deleteVoting.emit();
  }
}
