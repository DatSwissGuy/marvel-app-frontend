import { Component, Input, OnInit } from '@angular/core';
import { PageVisitsService } from '../../services/page-visits.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {

  constructor(
    private pageVisitsService: PageVisitsService
  ) {
  }

  @Input() characterName: string;
  @Input() characterImage: string;
  @Input() characterDescription: string;
  @Input() characterWikiUrl: string;
  @Input() characterId: number;
  @Input() pageVisits: number;

  private alreadyVisited: boolean;
  public shouldAnimate = false;
  private pageVisits$: Observable<number>;

  ngOnInit(): void {
    this.pageVisits$ = this.pageVisitsService.getCharacterVisits(this.characterId).pipe(
      map(response => {
        if (response.data.already_visited) {
          this.alreadyVisited = true;
          return this.pageVisits = response.data.visits;
        }
        if (response.data.visits === 1) {
          this.alreadyVisited = false;
          return this.pageVisits = 0;
        }
        this.alreadyVisited = false;
        return this.pageVisits = response.data.visits - 1;
      }),
      take(1)
    );
    this.pageVisits$.subscribe();
  }

  openWikiLink(): void {
    window.open(this.characterWikiUrl.toString());
  }

  countOneUp() {
    if (this.alreadyVisited === false) {
      setTimeout(() => {
        this.pageVisits += 1;
        this.alreadyVisited = true;
        this.shouldAnimate = true;
      }, 1000);
    }
  }
}
